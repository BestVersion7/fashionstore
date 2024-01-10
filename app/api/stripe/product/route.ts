import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_KEY);

export async function GET(req: NextRequest) {
    try {
        const productId = req.nextUrl.searchParams.get("product_id");
        let data;

        if (productId) {
            data = await stripe.products.retrieve(productId);
        } else {
            data = await stripe.products.list({
                limit: 10,
            });
        }
        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json(err, { status: 500 });
    }
}

// export async function POST() {
//     try {
//         await stripe.products.create({
//             name: "Elegant Silk Dress",
//             images: [
//                 "https://res.cloudinary.com/crimson-flamingo/image/upload/v1704865241/ecommerce/6.jpg",
//             ],
//             default_price_data: {
//                 currency: "usd",
//                 unit_amount: 85 * 100,
//             },
//             description:
//                 "A classic that layers beautifully with any outfit for an effortlessly chic look.",
//         });
//         return NextResponse.json("success", { status: 201 });
//     } catch (err) {
//         return NextResponse.json(err, { status: 500 });
//     }
// }

// export async function PUT() {
// try {
//     await stripe.products.update("prod_PLQCvUcD3DkxaS", {
//         images: [
//             "https://res.cloudinary.com/crimson-flamingo/image/upload/v1704822688/ecommerce/1.jpg",
//         ],
//     });
//     return NextResponse.json("success");
// } catch (err) {
//     return NextResponse.json(err, { status: 500 });
// }
// }

// export async function DELETE() {
//   try {
//     await stripe.products.del("prod_PI4yezOWxk8uzz");
//     return NextResponse.json("deleted");
//   } catch (err) {
//     return NextResponse.json(err, { status: 500 });
//   }
// }
