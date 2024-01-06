import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_KEY);

export async function GET(req: NextRequest) {
  try {
    const priceId = req.nextUrl.searchParams.get("price_id");
    const data = await stripe.prices.retrieve(priceId);
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(err, { status: 500 });
  }
}

// export async function POST() {
//   try {
//     await stripe.products.create({
//       name: "Shirt",
//       images: [
//         "https://res.cloudinary.com/crimson-flamingo/image/upload/v1663019587/travelsite2022/richmond%2C%20va/6.jpg",
//       ],
//       default_price_data: {
//         currency: "usd",
//         unit_amount: 30 * 100,
//       },
//       description: "This is a shirt",
//     });
//     // await stripe.products.create({
//     //   name: "Pants",
//     //   images: [
//     //     "https://res.cloudinary.com/crimson-flamingo/image/upload/h_665,w_1000/v1659363059/travelsite2022/0108tips/5.jpg",
//     //   ],
//     //   default_price_data: 30 * 100,
//     //   description: "This pants",
//     // });
//     // await stripe.products.create({
//     //   name: "Tie",
//     //   images: [
//     //     "https://res.cloudinary.com/crimson-flamingo/image/upload/v1659363059/travelsite2022/0108tips/2.jpg",
//     //   ],
//     //   default_price_data: 20 * 100,
//     //   description: "This tie",
//     // });
//     return NextResponse.json("success", { status: 201 });
//   } catch (err) {
//     return NextResponse.json(err, { status: 500 });
//   }
// }
