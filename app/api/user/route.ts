import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const email = req.nextUrl.searchParams.get("email");
    try {
        const data = await prisma.user.findUnique({
            where: { email: `${email}` },
        });

        if (email) {
            return NextResponse.json(data);
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

export async function PUT(req: NextRequest) {
    const email = req.nextUrl.searchParams.get("email");
    if (!email) {
        return NextResponse.json("no email", { status: 401 });
    }
    const { name } = await req.json();
    if (name === "") {
        return NextResponse.json("Please enter a name.", { status: 400 });
    }
    try {
        await prisma.user.update({
            data: {
                name,
            },
            where: {
                email,
            },
        });
        return NextResponse.json(`Your name has been updated.`);
    } catch (err) {
        return NextResponse.json("err", { status: 500 });
    }
}
