import prisma from "@/utils/db";
import { createUserRegisterSchema } from "@/utils/validationSchema";
import { JWTPayload, RegisterUserDTO } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateJWT } from "@/utils/generateToken";
/**
 * @method          Post
 * @route           ~/api/users/register
 * @description     Create New User (Sign Up)
 * @access          public
 */

export async function POST(request: NextRequest) {
  try {
    // define body
    const body = (await request.json()) as RegisterUserDTO;

    // Register Validation
    const validation = createUserRegisterSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }
    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.password, salt);
    // Check if user is existing
    const user = await prisma.user.findUnique({ where: { email: body.email } });
    if (user) {
      return NextResponse.json(
        { message: "This user is already registered" },
        { status: 400 }
      );
    }

    // If New User
    const newUser = await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        password: hashedPassword,
      },
      // ONLY get These From DB
      select: {
        username: true,
        id: true,
        isAdmin: true,
      },
    });
    const jwtPayload : JWTPayload = {
      id: newUser.id,
      isAdmin: newUser.isAdmin,
      username: newUser.username,
    };
    // @TODO -> JWT Token
    const token = generateJWT(jwtPayload)
    
    return NextResponse.json({ ...newUser, token }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
