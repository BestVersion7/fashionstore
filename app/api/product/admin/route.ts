import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        const page = req.nextUrl.searchParams.get("page");

        const data2 = await prisma.productInfo.findMany({
            orderBy: {
                created_at: "desc",
            },
            take: 24,
            skip: (Number(page) - 1) * 24,
        });

        const data = JSON.parse(
            JSON.stringify(
                data2,
                (_, value) =>
                    typeof value === "bigint" ? value.toString() : value // return everything else unchanged
            )
        );
        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json(err, { status: 500 });
    }
}
