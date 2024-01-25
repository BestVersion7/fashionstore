import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { email } = await req.json();
    try {
        const findUser = await prisma.user.findFirst({ where: { email } });

        if (findUser) {
            return NextResponse.json("User already exists");
        }
        await prisma.user.create({
            data: {
                email,
            },
        });
        return NextResponse.json("user created", { status: 201 });
    } catch (err) {
        return NextResponse.json("err", { status: 500 });
    }
}
