import prisma from "@/utils/db";
import { UserLoginSchema } from "@/utils/validationSchema";
import { JWTPayload, LoginUserDTO } from "@/types/types";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { generateJWT } from "@/utils/generateToken";
import { serialize } from "cookie";
/**
 * @method          POST
 * @route           ~/api/users/login
 * @description     Get User (Sign In)
 * @access          public
 */

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as LoginUserDTO;

    // login Validation
    const validation = UserLoginSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    // Check User if existing
    const user = await prisma.user.findUnique({ where: { email: body.email } });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 400 }
      );
    }
    // // Check User password and hashedPassword are the same
    const isPasswordMatched = await bcrypt.compare(
      body.password,
      user.password
    );
    if (!isPasswordMatched) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 400 }
      );
    }

    const jwtPayload: JWTPayload = {
      id: user.id,
      isAdmin: user.isAdmin,
      username: user.username,
    };
    // @TODO -> JWT Token
    const token = generateJWT(jwtPayload);

    const cookie = serialize("jwtToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // development=http, production=https
      sameSite: "strict",
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    })

    return NextResponse.json(
      {
        message: "User logged in successfully",
        
      },
      { status: 200, 
        headers: {
          "Set-Cookie": cookie
        }
       }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
