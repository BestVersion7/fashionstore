import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function PUT(req: NextRequest) {
    const { available_quantity } = await req.json();
    try {
        const productId = req.nextUrl.searchParams.get("product_id");
        await prisma.productAvailabilityInfo.update({
            where: {
                product_id: Number(productId),
            },
            data: {
                available_quantity,
            },
        });

        return NextResponse.json("Updated quantity");
    } catch (err) {
        return NextResponse.json("Failed to Updated", { status: 500 });
    }
}
