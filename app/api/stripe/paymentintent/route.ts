import { NextRequest, NextResponse } from "next/server";

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
