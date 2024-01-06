import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
    try {
        // check for cookies
        const cartCookie = cookies().get("cookiecart")?.value;

        if (!cartCookie || cartCookie === "undefined") {
            return NextResponse.json([]);
        } else {
            const data2 = await prisma.cartInfo.findMany({
                where: {
                    cookie_id: cartCookie,
                },
                orderBy: {
                    cart_id: "desc",
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
    // const price = req.nextUrl.searchParams.get('price')
    const { quantity, price_id, product_id, product_price } = await req.json();

    try {
        const cartCookie = cookies().get("cookiecart")?.value;

        const find = await prisma.cartInfo.findMany({
            where: {
                cookie_id: cartCookie,
                price_id,
            },
        });

        if (find.length < 1) {
            await prisma.cartInfo.create({
                data: {
                    price_id,
                    product_id,
                    quantity,
                    cookie_id: `${cartCookie}`,
                    product_price,
                },
            });
        } else {
            await prisma.cartInfo.updateMany({
                where: {
                    cookie_id: `${cartCookie}`,
                    price_id,
                },
                data: {
                    quantity: Number(find[0].quantity) + quantity,
                },
            });
        }

        return NextResponse.json("create success", { status: 200 });
    } catch (err) {
        return NextResponse.json(err, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    const { price_id, quantity } = await req.json();

    try {
        // check for cookies
        const cartCookie = cookies().get("cookiecart")?.value;

        await prisma.cartInfo.updateMany({
            where: {
                cookie_id: `${cartCookie}`,
                price_id,
            },
            data: {
                quantity,
            },
        });
        return NextResponse.json("update success", { status: 201 });
    } catch (err) {
        return NextResponse.json(err, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const { price_id } = await req.json();

    try {
        const cartCookie = cookies().get("cookiecart")?.value;

        await prisma.cartInfo.deleteMany({
            where: {
                price_id,
                cookie_id: cartCookie,
            },
        });
        return NextResponse.json("update success", { status: 201 });
    } catch (err) {
        return NextResponse.json(err, { status: 500 });
    }
}
