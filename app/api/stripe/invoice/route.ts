import { NextRequest, NextResponse } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_KEY);

export async function GET(req: NextRequest) {
  const invoiceId = req.nextUrl.searchParams.get("invoiceid");
  try {
    const invoice = await stripe.invoices.retrieve(invoiceId);
    return NextResponse.json(invoice);
  } catch (err) {
    return NextResponse.json("fail", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { customerId, cartItems } = body;

  // sample
  const bodySample = [
    {
      price_id: "price_1OTXTECUyZqMtN9sFYllu2rH",
      quantity: 2,
    },
  ];
  const cartLength = cartItems.length;

  try {
    //   step 1 create an invoice and get an id back
    const invoice = await stripe.invoices.create({
      customer: customerId,
    });

    // step 2 add the invoice lines
    for (let i = 0; i < cartLength; i++) {
      await stripe.invoiceItems.create({
        customer: customerId,
        price: cartItems[i].price_id,
        quantity: cartItems[i].quantity,
        invoice: invoice.id,
      });
    }

    // step 3 update invoice with the items and get the payment intent
    const finalizedInvoice = await stripe.invoices.finalizeInvoice(invoice.id);

    // step 4 get the payment intent
    const paymentIntent = await stripe.paymentIntents.retrieve(
      finalizedInvoice.payment_intent
    );

    // return the client secret
    return NextResponse.json(paymentIntent.client_secret, { status: 201 });
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}
