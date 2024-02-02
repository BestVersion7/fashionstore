import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const email = req.nextUrl.searchParams.get("email");

    let data;
    try {
        if (email) {
            data = await prisma.orderInfo.aggregate({
                _count: true,
                where: {
                    email: `${email}`,
                },
            });
        } else {
            data = await prisma.orderInfo.aggregate({
                _count: true,
            });
        }

        return NextResponse.json(data._count ?? 0);
    } catch (err) {
        return NextResponse.json(err, { status: 500 });
    }
}
