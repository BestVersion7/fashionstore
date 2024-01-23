import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        // check for cookies
        const cartCookie = req.nextUrl.searchParams.get("cookie_id");

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
    const { quantity, price_id, product_id } = await req.json();

    try {
        const cartCookie = req.nextUrl.searchParams.get("cookie_id");

        const findCart = await prisma.cartInfo.findMany({
            where: {
                cookie_id: `${cartCookie}`,
                product_id,
            },
        });

        // find available quantity
        const findAvailQuantity =
            await prisma.productAvailabilityInfo.findUnique({
                where: {
                    product_id,
                },
                select: {
                    available_quantity: true,
                },
            });
        const availableQuantity =
            Number(findAvailQuantity?.available_quantity) || 0;

        // error if too many units
        if (quantity > availableQuantity) {
            return NextResponse.json(
                `The maximum quantity is ${availableQuantity}.`,
                { status: 400 }
            );
        }

        // create if not exists
        if (findCart.length < 1) {
            const price = await prisma.priceInfo.findUnique({
                where: { price_id },
            });
            // prevent entering your own price
            await prisma.cartInfo.create({
                data: {
                    price_id,
                    product_id,
                    quantity,
                    cookie_id: `${cartCookie}`,
                    product_price: Number(price?.unit_amount),
                },
            });
            return NextResponse.json(
                `${quantity} Item(s) added to your cart.`,
                { status: 201 }
            );
        } else {
            if (Number(findCart[0].quantity) + quantity > availableQuantity) {
                return NextResponse.json(
                    `The maximum quantity is ${availableQuantity}.`,
                    { status: 400 }
                );
            }
            await prisma.cartInfo.updateMany({
                where: {
                    cookie_id: `${cartCookie}`,
                    price_id,
                },
                data: {
                    quantity: Number(findCart[0].quantity) + quantity,
                },
            });
            return NextResponse.json(`Item quantity updated to ${quantity}`);
        }
    } catch (err) {
        return NextResponse.json(err, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    const { product_id, quantity } = await req.json();

    try {
        // check for cookies
        const cartCookie = req.nextUrl.searchParams.get("cookie_id");
        const findAvailQuantity =
            await prisma.productAvailabilityInfo.findUnique({
                where: {
                    product_id,
                },
                select: {
                    available_quantity: true,
                },
            });

        const availableQuantity =
            Number(findAvailQuantity?.available_quantity) || 0;

        // error if too many units
        if (quantity > availableQuantity) {
            return NextResponse.json(
                `The maximum quantity is ${availableQuantity}.`,
                { status: 400 }
            );
        }

        await prisma.cartInfo.updateMany({
            where: {
                cookie_id: `${cartCookie}`,
                product_id,
            },
            data: {
                quantity,
            },
        });
        return NextResponse.json(`Item quantity updated to ${quantity}`);
    } catch (err) {
        return NextResponse.json(err, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    const { product_id } = await req.json();

    try {
        const cartCookie = req.nextUrl.searchParams.get("cookie_id");

        await prisma.cartInfo.deleteMany({
            where: {
                product_id,
                cookie_id: `${cartCookie}`,
            },
        });
        return NextResponse.json("delete success");
    } catch (err) {
        return NextResponse.json(err, { status: 500 });
    }
}
