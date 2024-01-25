import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const product_id = req.nextUrl.searchParams.get("product_id");

    try {
        if (!product_id) {
            return NextResponse.json(0);
        }

        const data2 = await prisma.productReviewInfo.findMany({
            where: {
                product_id,
            },
            orderBy: {
                created_at: "desc",
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
    const product_id = req.nextUrl.searchParams.get("product_id");
    const { user_email, review_message, review_star } = await req.json();

    try {
        if (!product_id) {
            return NextResponse.json("no id");
        }

        if (review_star === 0) {
            return NextResponse.json("Please select review rating.", {
                status: 400,
            });
        }

        await prisma.productReviewInfo.create({
            data: {
                product_id,
                user_email,
                review_message,
                review_star,
            },
        });

        return NextResponse.json("Review posted.", { status: 201 });
    } catch (err) {
        return NextResponse.json(err, { status: 500 });
    }
}
