import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const userId = req.nextUrl.searchParams.get("user_id");
    try {
        const email = req.nextUrl.searchParams.get("email");

        const data2 = await prisma.orderInfo.findMany({
            where: {
                email: `${email}`,
            },
        });

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
        await prisma.orderInfo.create({
            data: {
                order_total,
                email,
                order_items,
                payment_intent,
            },
        });
        return NextResponse.json("success");
    } catch (err) {
        return NextResponse.json("fail", { status: 500 });
    }
}
