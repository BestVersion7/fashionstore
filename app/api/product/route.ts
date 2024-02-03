import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        const productId = req.nextUrl.searchParams.get("product_id");
        const page = req.nextUrl.searchParams.get("page");

        let data2;

        if (productId) {
            data2 = await prisma.productInfo.findUnique({
                where: {
                    product_id: Number(productId),
                },
            });
        } else {
            data2 = await prisma.productInfo.findMany({
                orderBy: {
                    created_at: "desc",
                },
                take: 24,
                where: {
                    active: true,
                },
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

export async function PUT(req: NextRequest) {
    try {
        const { name, category, description, default_price, active } =
            await req.json();
        const productId = req.nextUrl.searchParams.get("product_id");

        let booleanActive = true;
        if (active === "false" || active === false) {
            booleanActive = false;
        }
        await prisma.productInfo.update({
            where: {
                product_id: Number(productId),
            },
            data: {
                name,
                description,
                default_price,
                active: booleanActive,
                category,
            },
        });
        return NextResponse.json("Updated");
    } catch (err) {
        return NextResponse.json("Failed", { status: 500 });
    }
}
