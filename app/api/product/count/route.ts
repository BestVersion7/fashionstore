import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        let data2;

        const productName = req.nextUrl.searchParams.get("product_name");
        const productCategtory =
            req.nextUrl.searchParams.get("product_category");

        if (productCategtory) {
            data2 = await prisma.productInfo.aggregate({
                _count: true,
                where: {
                    category: productCategtory,
                },
            });
        } else if (productName) {
            data2 = await prisma.productInfo.aggregate({
                _count: true,
                where: {
                    name: {
                        contains: productName,
                        mode: "insensitive",
                    },
                },
            });
        } else {
            data2 = await prisma.productInfo.aggregate({
                _count: true,
            });
        }

        const data = JSON.parse(
            JSON.stringify(
                data2,
                (_, value) =>
                    typeof value === "bigint" ? value.toString() : value // return everything else unchanged
            )
        );

        return NextResponse.json(Number(data._count));
    } catch (err) {
        return NextResponse.json(err, { status: 500 });
    }
}
