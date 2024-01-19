import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
    const session = await getToken({ req });

    if (!session) {
        return NextResponse.redirect(new URL("/signin", req.url));
    } else if (session) {
        return NextResponse.next();
    }
}

export const config = {
    matcher: ["/checkout", "/checkout/:path*", "/account", "/account/:path*"],
};
