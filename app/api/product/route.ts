import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data2 = await prisma.productInfo.findMany();
    const data = JSON.parse(
      JSON.stringify(
        data2,
        (_, value) => (typeof value === "bigint" ? value.toString() : value) // return everything else unchanged
      )
    );
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json("err", { status: 500 });
  }
}
