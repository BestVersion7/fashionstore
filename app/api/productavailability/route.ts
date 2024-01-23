import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        const productId = req.nextUrl.searchParams.get("product_id");
        let quantity;

        if (productId) {
            const data = await prisma.productAvailabilityInfo.findUnique({
                where: {
                    product_id: productId,
                },
            });
            if (data?.available_quantity) {
                quantity = Number(data.available_quantity);
            } else {
                quantity = 0;
            }
            return NextResponse.json(quantity);
        } else {
            return NextResponse.json("noquery", { status: 400 });
        }
    } catch (err) {
        return NextResponse.json(err, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    try {
        const { quantity } = await req.json();
        const productId = req.nextUrl.searchParams.get("product_id");

        if (productId) {
            const searchQuantity =
                await prisma.productAvailabilityInfo.findUnique({
                    where: { product_id: productId },
                    select: {
                        available_quantity: true,
                    },
                });
            const availQuantity = Number(searchQuantity?.available_quantity);

            if (!quantity || typeof quantity !== "number") {
                return NextResponse.json("Quantity error", { status: 400 });
            }

            // quantity cannot be negative
            if (quantity > availQuantity) {
                return NextResponse.json(
                    "The quantity exceeds the available quantity"
                );
            } else {
                await prisma.productAvailabilityInfo.update({
                    data: {
                        available_quantity: availQuantity - quantity,
                    },
                    where: {
                        product_id: productId,
                    },
                });
            }

            return NextResponse.json("updated");
        } else {
            return NextResponse.json("noquery", { status: 400 });
        }
    } catch (err) {
        return NextResponse.json(err, { status: 500 });
    }
}
