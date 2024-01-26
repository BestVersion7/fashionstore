import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        // check for cookies
        const productId = req.nextUrl.searchParams.get("product_id");

        if (!productId) {
            return NextResponse.json([]);
        } else {
            const data = await prisma.cartInfo.aggregate({
                _sum: {
                    quantity: true,
                },
                where: {
                    product_id: productId,
                },
            });

            return NextResponse.json(data._sum);
        }
    } catch (err) {
        return NextResponse.json(err, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    const { product_id, purchased } = await req.json();
    const cartCookie = req.nextUrl.searchParams.get("cookie_id");
    try {
        await prisma.cartInfo.updateMany({
            where: {
                cookie_id: `${cartCookie}`,
                product_id,
            },
            data: {
                purchased,
            },
        });
        return NextResponse.json(`Update purchased`);
    } catch (err) {
        return NextResponse.json(err, { status: 500 });
    }
}
