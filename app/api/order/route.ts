import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const paymentIntent = req.nextUrl.searchParams.get("payment_intent");
    const email = req.nextUrl.searchParams.get("email");
    const page = req.nextUrl.searchParams.get("page");

    let data2;
    try {
        if (paymentIntent) {
            data2 = await prisma.orderInfo.findFirst({
                where: {
                    payment_intent: paymentIntent,
                },
            });
        } else if (email && page) {
            data2 = await prisma.orderInfo.findMany({
                where: {
                    email: `${email}`,
                },
                orderBy: {
                    order_number: "desc",
                },
                take: 2,
                skip: (Number(page) - 1) * 2,
            });
        } else if (page) {
            data2 = await prisma.orderInfo.findMany({
                orderBy: {
                    order_number: "desc",
                },
                take: 10,
                skip: (Number(page) - 1) * 10,
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
    const { order_total, cookie_id, payment_intent, email } = await req.json();

    try {
        // check the quantity to real time availability
        //    this is already handled in the form

        await prisma.orderInfo.create({
            data: {
                order_total,
                email,
                cookie_id,
                payment_intent,
            },
        });
        return NextResponse.json("Order created");
    } catch (err) {
        return NextResponse.json("fail", { status: 500 });
    }
}
