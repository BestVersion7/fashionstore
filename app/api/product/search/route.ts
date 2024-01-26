import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        let data;

        const productName = req.nextUrl.searchParams.get("product_name");

        const productCategtory =
            req.nextUrl.searchParams.get("product_category");
        if (productCategtory) {
            data = await prisma.productInfo.findMany({
                where: {
                    category: productCategtory,
                },
            });
        } else if (productName) {
            data = await prisma.productInfo.findMany({
                where: {
                    name: {
                        contains: productName,
                        mode: "insensitive",
                    },
                },
            });
        }

        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json(err, { status: 500 });
    }
}
