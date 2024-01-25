import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const email = req.nextUrl.searchParams.get("email");
    try {
        const data = await prisma.user.findUnique({
            where: { email: `${email}` },
            select: {
                name: true,
            },
        });

        if (email) {
            return NextResponse.json(data?.name);
        } else {
            return NextResponse.json("No Id");
        }
    } catch (err) {
        return NextResponse.json("err", { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const { email } = await req.json();
    try {
        const findUser = await prisma.user.findUnique({ where: { email } });

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
