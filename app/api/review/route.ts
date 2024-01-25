import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const product_id = req.nextUrl.searchParams.get("product_id");

    try {
        // check for cookies
        if (!product_id) {
            return NextResponse.json(0);
        }

        const data2 = await prisma.productReviewInfo.findMany({
            where: {
                product_id,
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
