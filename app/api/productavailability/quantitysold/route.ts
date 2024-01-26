import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function PUT(req: NextRequest) {
    try {
        const productId = req.nextUrl.searchParams.get("product_id");
        const { quantity } = await req.json();

        if (productId) {
            const searchQuantity =
                await prisma.productAvailabilityInfo.findUnique({
                    where: { product_id: productId },
                    select: {
                        quantity_sold: true,
                    },
                });
            const previousQuantity = Number(searchQuantity?.quantity_sold) || 0;

            if (!quantity) {
                return NextResponse.json("Quantity error", { status: 400 });
            }

            await prisma.productAvailabilityInfo.update({
                data: {
                    quantity_sold: previousQuantity + Number(quantity),
                },
                where: {
                    product_id: productId,
                },
            });

            return NextResponse.json("updated");
        } else {
            return NextResponse.json("noquery", { status: 400 });
        }
    } catch (err) {
        return NextResponse.json(err, { status: 500 });
    }
}
