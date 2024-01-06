import { NextRequest, NextResponse } from "next/server";

const cartOrigin = "https://www.hunterkf.com/api/v2/cart";
const options = {
    headers: {
        authorization: `${process.env.API_KEY}`,
    },
};

export async function GET(req: NextRequest) {
    const cartCookie = req.nextUrl.searchParams.get("cookie_id");

    const res = await fetch(`${cartOrigin}?cookie_id=${cartCookie}`, {
        ...options,
        cache: "no-cache",
    });
    const data = await res.json();
    return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
    const cartCookie = req.nextUrl.searchParams.get("cookie_id");
    const body = await req.json();

    const res = await fetch(`${cartOrigin}?cookie_id=${cartCookie}`, {
        ...options,
        method: "post",
        body: JSON.stringify(body),
    });
    const data = await res.json();
    console.log(data);
    return NextResponse.json("data");
}

export async function PUT(req: NextRequest) {
    const cartCookie = req.nextUrl.searchParams.get("cookie_id");
    const body = await req.json();

    const res = await fetch(`${cartOrigin}?cookie_id=${cartCookie}`, {
        ...options,
        method: "put",
        body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data);
}

export async function DELETE(req: NextRequest) {
    const cartCookie = req.nextUrl.searchParams.get("cookie_id");
    const { price_id } = await req.json();

    const res = await fetch(`${cartOrigin}?cookie_id=${cartCookie}`, {
        ...options,
        method: "delete",
        body: JSON.stringify({ price_id }),
    });
    const data = await res.json();
    return NextResponse.json(data);
}
