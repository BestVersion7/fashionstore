import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const productId = req.nextUrl.searchParams.get("product_id");

    try {
        // check for cookies
        if (!productId) {
            return NextResponse.json(0);
        }

        const data = await prisma.productReviewInfo.aggregate({
            _avg: {
                review_star: true,
            },
            where: {
                product_id: Number(productId),
            },
        });

        return NextResponse.json(Number(data._avg.review_star) ?? 0);
    } catch (err) {
        return NextResponse.json(err, { status: 500 });
    }
}
