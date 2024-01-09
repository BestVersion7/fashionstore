import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_KEY);

export async function GET(req: NextRequest) {
    try {
        let data;

        const productName = req.nextUrl.searchParams.get("product_name");

        const producCategtory =
            req.nextUrl.searchParams.get("product_category");
        if (producCategtory) {
            data = await stripe.products.search({
                query: `metadata['category']:\'${producCategtory}\'`,
            });
        } else if (productName) {
            // stripe has a 3 character substring minimum
            // if (Number(productName?.length) < 2) {
            //     data = { data: [] };
            // } else if (Number(productName?.length) < 4) {
            //     data = await stripe.products.list({
            //         limit: 25,
            //     });
            // } else {
            // }
            data = await stripe.products.search({
                query: `name~'${productName}'`,
            });
        }

        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json(err, { status: 500 });
    }
}
