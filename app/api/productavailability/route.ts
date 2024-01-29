import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        const productId = req.nextUrl.searchParams.get("product_id");
        let data;

        if (productId) {
            data = await prisma.productAvailabilityInfo.findUnique({
                where: {
                    product_id: Number(productId),
                },
                select: {
                    available_quantity: true,
                },
            });
            return NextResponse.json(data);
        } else {
            return NextResponse.json("noId", { status: 400 });
        }
    } catch (err) {
        return NextResponse.json(err, { status: 500 });
    }
}

// export async function POST() {
//     for (let i = 62; i < 113; i++) {
//         await prisma.productAvailabilityInfo.create({
//             data: {
//                 // product_id: i,
//                 available_quantity: 3,
//             },
//         });
//     }
//     return NextResponse.json("yes");
// }

export async function PUT(req: NextRequest) {
    try {
        const { quantity } = await req.json();
        const productId = req.nextUrl.searchParams.get("product_id");

        if (productId) {
            const searchQuantity =
                await prisma.productAvailabilityInfo.findUnique({
                    where: { product_id: Number(productId) },
                    select: {
                        available_quantity: true,
                    },
                });
            const availQuantity =
                Number(searchQuantity?.available_quantity) || 0;

            if (!quantity) {
                return NextResponse.json("Quantity error", { status: 400 });
            }

            // quantity cannot be negative
            if (Number(quantity) > availQuantity) {
                return NextResponse.json(
                    "The quantity exceeds the available quantity"
                );
            } else {
                await prisma.productAvailabilityInfo.update({
                    data: {
                        available_quantity: availQuantity - Number(quantity),
                    },
                    where: {
                        product_id: Number(productId),
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
