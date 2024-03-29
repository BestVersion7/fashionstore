import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const productId = req.nextUrl.searchParams.get("product_id");
    const page = req.nextUrl.searchParams.get("page");

    try {
        let data2;

        if (productId && page) {
            data2 = await prisma.productReviewInfo.findMany({
                where: {
                    product_id: Number(productId),
                },
                orderBy: {
                    created_at: "desc",
                },
                take: 10,
                skip: (Number(page) - 1) * 10,
            });
        } else if (page) {
            data2 = await prisma.productReviewInfo.findMany({
                orderBy: {
                    created_at: "desc",
                },
                take: 20,
                skip: (Number(page) - 1) * 20,
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
    const productId = req.nextUrl.searchParams.get("product_id");
    const { user_email, review_message, review_star } = await req.json();

    try {
        if (!productId) {
            return NextResponse.json({ message: "No User id." });
        }

        if (review_star === 0) {
            return NextResponse.json(
                { message: "Please select review rating.", status: 400 },
                {
                    status: 400,
                }
            );
        }

        await prisma.productReviewInfo.create({
            data: {
                product_id: Number(productId),
                user_email,
                review_message,
                review_star,
            },
        });

        return NextResponse.json(
            { message: "Review posted." },
            { status: 201 }
        );
    } catch (err) {
        return NextResponse.json(err, { status: 500 });
    }
}
