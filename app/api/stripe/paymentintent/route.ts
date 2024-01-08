import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

const stripe = require("stripe")(process.env.STRIPE_KEY);

export async function GET(req: NextRequest) {
    try {
        const data = await stripe.paymentIntents.retrieve(
            req.nextUrl.searchParams.get("id")
        );

        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json(err, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const { amount } = await req.json();
    try {
        const cartCookie = req.nextUrl.searchParams.get("cookie_id");
        const findIntent = await prisma.cookieInfo.findUnique({
            where: {
                cookie_id: `${cartCookie}`,
            },
            select: {
                payment_intent: true,
            },
        });

        if (findIntent?.payment_intent) {
            const paymentIntent = await stripe.paymentIntents.update(
                findIntent?.payment_intent,
                {
                    amount,
                }
            );

            return NextResponse.json(paymentIntent.client_secret);
        } else {
            const paymentIntent = await stripe.paymentIntents.create({
                amount,
                currency: "usd",
            });

            await prisma.cookieInfo.update({
                where: {
                    cookie_id: `${cartCookie}`,
                },
                data: {
                    payment_intent: paymentIntent.id,
                },
            });

            return NextResponse.json(paymentIntent.client_secret, {
                status: 201,
            });
        }
    } catch (err) {
        return NextResponse.json(err, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    const paymentId = req.nextUrl.searchParams.get("payment_id");
    const { email, amount } = await req.json();
    try {
        await stripe.paymentIntents.update(paymentId, {
            receipt_email: email,
            amount,
        });
        return NextResponse.json("updated");
    } catch (err) {
        return NextResponse.json("error", { status: 500 });
    }
}
