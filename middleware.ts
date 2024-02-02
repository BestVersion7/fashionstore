import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
// import { Ratelimit } from "@upstash/ratelimit";
// import { kv } from "@vercel/kv";

// too f expensive for redis api limiter
// const ratelimit = new Ratelimit({
//     redis: kv,
//     limiter: Ratelimit.slidingWindow(20, "1 s"),
// });

// let availableOrigins = "http://localhost:3000";
// if (process.env.NODE_ENV === "production") {
//     availableOrigins = "https://afashionstore.vercel.app";
// }

const myEmail = "hunterkfan@gmail.com";

export async function middleware(req: NextRequest) {
    const apiKey = req.headers.get("authorization");

    if (req.nextUrl.pathname.startsWith("/api/order") && req.method === "GET") {
        if (apiKey !== process.env.API_KEY) {
            return NextResponse.json("unauthorized", { status: 401 });
        } else {
            return NextResponse.next();
        }
    }

    if (
        (req.nextUrl.pathname.startsWith("/api/product") &&
            req.method === "PUT") ||
        (req.nextUrl.pathname.startsWith("/api/price") &&
            req.method === "PUT") ||
        (req.nextUrl.pathname.startsWith("/api/price") && req.method === "POST")
    ) {
        const session = await getToken({ req });
        if (session?.email === myEmail) {
            return NextResponse.next();
        } else {
            return NextResponse.json("unauthorized", { status: 401 });
        }
    }

    if (req.nextUrl.pathname.startsWith("/account")) {
        const session = await getToken({ req });
        if (!session) {
            return NextResponse.redirect(new URL("/signin", req.url));
        } else if (session) {
            return NextResponse.next();
        }
    }
    if (req.nextUrl.pathname.startsWith("/dashboard")) {
        const session = await getToken({ req });
        if (session?.email === myEmail) {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(new URL("/blocked", req.url));
        }
    }

    // if (req.nextUrl.pathname.startsWith("/api")) {
    //     const ip = req.ip ?? "127.0.0.1";
    //     const res = await ratelimit.limit(ip);
    //     return res.success
    //         ? NextResponse.next()
    //         : NextResponse.redirect(new URL("/blocked", req.url));
    // }
    // if (req.nextUrl.pathname.startsWith("/checkout")) {
    //     if (!session) {
    //         return NextResponse.redirect(new URL("/signin", req.url));
    //     } else if (session) {
    //         return NextResponse.next();
    //     }
    // }
}
