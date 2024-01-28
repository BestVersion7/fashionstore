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
            _count: true,
            where: {
                product_id: Number(productId),
            },
        });

        return NextResponse.json(data._count ?? 0);
    } catch (err) {
        return NextResponse.json(err, { status: 500 });
    }
}
