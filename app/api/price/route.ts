import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        const priceId = req.nextUrl.searchParams.get("price_id");
        const productId = req.nextUrl.searchParams.get("product_id");

        if (priceId) {
            const data = await prisma.priceInfo.findUnique({
                where: {
                    price_id: Number(priceId),
                },
                select: {
                    unit_amount: true,
                },
            });
            return NextResponse.json(data);
        } else if (productId) {
            const data2 = await prisma.priceInfo.findMany({
                where: {
                    product_id: Number(productId),
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
        }
    } catch (err) {
        return NextResponse.json(err, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const { unit_amount, product_id } = await req.json();
    try {
        await prisma.priceInfo.create({
            data: {
                unit_amount,
                product_id,
            },
        });

        return NextResponse.json("Created");
    } catch (err) {
        return NextResponse.json("Failed", { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    const priceId = req.nextUrl.searchParams.get("price_id");
    const { unit_amount } = await req.json();

    try {
        // check there were no purchases in the past
        const check = await prisma.cartInfo.findFirst({
            where: {
                price_id: Number(priceId),
                purchased: true,
            },
            select: {
                purchased: true,
            },
        });

        if (check?.purchased) {
            return NextResponse.json("Cannot be updated", { status: 400 });
        }

        await prisma.priceInfo.update({
            data: {
                unit_amount,
            },
            where: {
                price_id: Number(priceId),
            },
        });

        return NextResponse.json("Updated");
    } catch (err) {
        return NextResponse.json("Failed", { status: 500 });
    }
}
