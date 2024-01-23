import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const paymentIntent = req.nextUrl.searchParams.get("payment_intent");
    const email = req.nextUrl.searchParams.get("email");
    let data2;
    try {
        if (paymentIntent) {
            data2 = await prisma.orderInfo.findFirst({
                where: {
                    payment_intent: paymentIntent,
                },
            });
        } else if (email) {
            data2 = await prisma.orderInfo.findMany({
                where: {
                    email: `${email}`,
                },
                orderBy: {
                    order_number: "desc",
                },
            });
        }

        const data = JSON.parse(
            JSON.stringify(
                data2,
                (_, value) =>
                    typeof value === "bigint" ? value.toString() : value // return everything else unchanged
            )
        );
        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json(err, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const { order_total, order_items, payment_intent, email } =
        await req.json();

    try {
        // check the quantity to real time availability
        // const orderLength = order_items.length;
        // for (let i = 0; i < orderLength; i++) {
        //     const findAvailability =
        //         await prisma.productAvailabilityInfo.findUnique({
        //             where: {
        //                 product_id: order_items[i].product_id,
        //             },
        //             select: {
        //                 available_quantity: true,
        //             },
        //         });
        //     const availability =
        //         Number(findAvailability?.available_quantity) || 0;

        //     if (Number(order_items[i].quantity) > availability) {
        //         return NextResponse.json(
        //             `An item in your cart exceeds availability.`,
        //             {
        //                 status: 400,
        //             }
        //         );
        //     }
        // }

        await prisma.orderInfo.create({
            data: {
                order_total,
                email,
                order_items,
                payment_intent,
            },
        });
        return NextResponse.json("Order created");
    } catch (err) {
        return NextResponse.json("fail", { status: 500 });
    }
}
