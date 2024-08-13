import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import jwt from "jsonwebtoken";
import { JWTPayload } from "@/types/types";
interface Props {
  params: { id: string };
}

/**
 * @method          DELETE
 * @route           ~/api/users/Profile/:id
 * @description     Delete profile
 * @access          private (Onle user himself can delete his account)
 */

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    // Get the user id from DB
    const user = await prisma.user.findUnique({
      where: { id: parseInt(params.id) },
    });

    // Check if user is found OR not found
    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }

    // Take token from Headers and decode it
    const jwtToken = request.cookies.get("jwtToken");
    const token = jwtToken?.value as string

    // Check authToken is not found

    /******** this check is in the middleware function *********/
    // if (!authToken) {
    //   return NextResponse.json(
    //     { message: "no token provided, access denied" },
    //     { status: 401 }
    //   );
    // } 

    // if authToken is found
    const userFromToken = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JWTPayload;

    // Check if user from token is the same as user from DB
    if (userFromToken.id === user.id) {
      // delete user himself his profile
      await prisma.user.delete({ where: { id: parseInt(params.id) } });
      return NextResponse.json(
        { message: "your profile (account) has been deleted" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "only user himself can delete his profile, forbidden" },
      { status: 403 }
    ); // Forbidden
  } catch (error) {
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 }
    );
  }
}
