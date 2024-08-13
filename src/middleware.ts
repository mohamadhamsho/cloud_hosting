import { NextResponse, NextRequest} from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {

 const jwtToken = request.cookies.get("jwtToken");
 const token = jwtToken?.value as string // Check authToken is not found
 if (!token) {
   return NextResponse.json(
     { message: "no token provided, access denied" },
     { status: 401 }
   ); // Unauthoized
 }

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/api/users/profile/:path*"],
}