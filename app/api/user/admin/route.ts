import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const data = await prisma.user.findMany({});
        return NextResponse.json(data);
    } catch (err) {
        return NextResponse.json("err", { status: 500 });
    }
}
