import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const month = 1000 * 60 * 60 * 24 * 30;
    // created 1/1 and now is 2/3 so created+30>now
    const monthLimit = new Date(Date.now() - month);
    try {
        const productId = req.nextUrl.searchParams.get("product_id");

        if (productId) {
            const data = await prisma.cartInfo.aggregate({
                _sum: {
                    quantity: true,
                },
                where: {
                    product_id: Number(productId),
                    purchased: true,
                    created_at: {
                        gte: monthLimit,
                    },
                },
            });

            return NextResponse.json(data._sum.quantity || 0);
        } else {
            const data = await prisma.cartInfo.groupBy({
                by: "product_id",
                _sum: {
                    quantity: true,
                },
                where: {
                    purchased: true,
                    created_at: {
                        gte: monthLimit,
                    },
                },
                orderBy: [
                    {
                        _sum: {
                            quantity: "desc",
                        },
                    },
                ],
                take: 8,
            });
            return NextResponse.json(data);
        }
    } catch (err) {
        return NextResponse.json(err, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    const cartCookie = req.nextUrl.searchParams.get("cookie_id");
    try {
        await prisma.cartInfo.updateMany({
            where: {
                cookie_id: `${cartCookie}`,
            },
            data: {
                purchased: true,
            },
        });
        return NextResponse.json(`Update purchased`);
    } catch (err) {
        return NextResponse.json(err, { status: 500 });
    }
}
