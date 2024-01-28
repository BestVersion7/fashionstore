import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        const priceId = req.nextUrl.searchParams.get("price_id");
        const data = await prisma.priceInfo.findUnique({
            where: {
                price_id: Number(priceId),
            },
            select: {
                unit_amount: true,
            },
        });
        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json(err, { status: 500 });
    }
}

// export async function POST() {
//     try {
//         const { data } = await stripe.prices.list({ limit: 10 });

//         for (let i = 0; i < data.length; i++) {
//             await prisma.priceInfo.create({
//                 data: {
//                     price_id: data[i].id,
//                     product_id: data[i].product,
//                     unit_amount: data[i].unit_amount,
//                 },
//             });
//         }
//         return NextResponse.json(data);
//     } catch (err) {
//         return NextResponse.json(err, { status: 500 });
//     }
// }
