import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const cartCookie = req.nextUrl.searchParams.get("cookie_id");

    try {
        // check for cookies
        if (!cartCookie) {
            return NextResponse.json(0);
        }

        const data = await prisma.cartInfo.aggregate({
            _sum: {
                quantity: true,
            },
            where: {
                cookie_id: cartCookie,
            },
        });

        return NextResponse.json(data._sum.quantity ?? 0);
    } catch (err) {
        return NextResponse.json(err, { status: 500 });
    }
}
