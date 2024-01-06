import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
    const cartCookie = cookies().get("cookiecart")?.value;
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
