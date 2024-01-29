import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        let data2;

        const productName = req.nextUrl.searchParams.get("product_name");
        const page = req.nextUrl.searchParams.get("page");
        const count = req.nextUrl.searchParams.get("count");

        const productCategtory =
            req.nextUrl.searchParams.get("product_category");
        if (productCategtory) {
            data2 = await prisma.productInfo.findMany({
                where: {
                    category: productCategtory,
                },
                orderBy: {
                    created_at: "desc",
                },
                take: 24,
                skip: (Number(page) - 1) * 24,
            });
        } else if (productName) {
            data2 = await prisma.productInfo.findMany({
                where: {
                    name: {
                        contains: productName,
                        mode: "insensitive",
                    },
                },
                orderBy: {
                    created_at: "desc",
                },
                take: Number(count),
                skip: (Number(page) - 1) * 24,
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
