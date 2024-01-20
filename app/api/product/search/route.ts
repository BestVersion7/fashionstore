import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_KEY);
import prisma from "@/app/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        let data;

        const productName = req.nextUrl.searchParams.get("product_name");

        const productCategtory =
            req.nextUrl.searchParams.get("product_category");
        if (productCategtory) {
            data = await prisma.productInfo.findMany({
                where: {
                    metadata: {
                        path: ["category"],
                        equals: productCategtory,
                    },
                },
            });
        } else if (productName) {
            data = await prisma.productInfo.findMany({
                where: {
                    name: {
                        search: productName,
                    },
                },
            });
        }

        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json(err, { status: 500 });
    }
}
