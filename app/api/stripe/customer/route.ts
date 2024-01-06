import { NextRequest, NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, shipping } = body;

    const customer = await stripe.customers.create({
      name,
      email,
      shipping,
    });

    return NextResponse.json(customer.id, { status: 201 });
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}
