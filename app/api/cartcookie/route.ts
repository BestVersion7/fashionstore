import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { cookies } from "next/headers";

export async function POST() {
    try {
        const data = await prisma.cookieInfo.create({});

        const response = NextResponse.json("cookie created");
        response.cookies.set({
            name: "cookiecart",
            value: data.cookie_id,
            secure: true,
            // httpOnly: true,
            // max 30 days
            maxAge: 60 * 60 * 24 * 30,
        });

        return response;
    } catch (error) {
        return NextResponse.json("cookie fail", { status: 500 });
    }
}

export async function DELETE() {
    try {
        const response = NextResponse.json("cookie deleted");
        // cookies().delete("cookiecart");
        const oneDay = 24 * 60 * 60 * 1000;
        cookies().set("cookiecart", "value", { expires: Date.now() - oneDay });

        return response;
    } catch (error) {
        return NextResponse.json("cookie fail", { status: 500 });
    }
}
