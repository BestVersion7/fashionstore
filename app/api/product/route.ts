import { NextRequest, NextResponse } from "next/server";
// const stripe = require("stripe")(process.env.STRIPE_KEY);
import prisma from "@/app/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        const productId = req.nextUrl.searchParams.get("product_id");
        let data;

        if (productId) {
            data = await prisma.productInfo.findUnique({
                where: {
                    product_id: productId,
                },
            });
        } else {
            data = await prisma.productInfo.findMany({
                take: 10,
                orderBy: {
                    created_at: "desc",
                },
            });
        }

        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json(err, { status: 500 });
    }
}

// export async function POST() {
//     try {
//         const { data } = await stripe.products.list({ limit: 10 });
//         for (let i = 0; i < data.length; i++) {
//             await prisma.productInfo.create({
//                 data: {
//                     product_id: data[i].id,
//                     default_price: data[i].default_price,
//                     description: data[i].description,
//                     images: data[i].images,
//                     metadata: data[i].metadata,
//                     name: data[i].name,
//                 },
//             });
//         }

//         return NextResponse.json("created", { status: 201 });
//     } catch (err) {
//         return NextResponse.json(err, { status: 500 });
//     }
// }
