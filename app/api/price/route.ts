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

// export async function PUT() {
//     const data = await prisma.priceInfo.updateMany({
//         where: {
//             unit_amount: null,
//         },
//         data: {
//             unit_amount: 0,
//         },
//     });
//     return NextResponse.json("udpated price");
// }
