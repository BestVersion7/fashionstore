import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const productId = req.nextUrl.searchParams.get("product_id");
    let data;
    try {
        if (productId) {
            data = await prisma.productReviewInfo.aggregate({
                _count: true,
                where: {
                    product_id: Number(productId),
                },
            });
        } else {
            data = await prisma.productReviewInfo.aggregate({
                _count: true,
            });
        }

        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json(err, { status: 500 });
    }
}
