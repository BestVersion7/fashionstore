import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const origin = "https://www.hunterkf.com/api/v2/cartcookie";

export async function POST() {
    try {
        let id = randomUUID();
        await fetch(origin, {
            method: "post",
            body: JSON.stringify({ cookie_id: id }),
            headers: {
                authorization: `${process.env.API_KEY}`,
            },
        });

        const response = NextResponse.json("cookie created");
        response.cookies.set({
            name: "cookiecart",
            value: id,
            secure: false,
            // httpOnly: true,
            // max 4 days
            maxAge: 60 * 60 * 24 * 4,
        });
        return response;
    } catch (error) {
        return NextResponse.json("cookie fail", { status: 500 });
    }
}

export async function DELETE() {
    try {
        const cartCookie = cookies().get("cookiecart")?.value;

        const data = await fetch(`${origin}?cookie_id=${cartCookie}`, {
            method: "delete",
            headers: {
                authorization: `${process.env.API_KEY}`,
            },
        });
        // const res = await data.json();

        const response = NextResponse.json("cookie deleted");

        const oneDay = 24 * 60 * 60 * 1000;
        cookies().set("cookiecart", "value", { expires: Date.now() - oneDay });

        return response;
    } catch (error) {
        return NextResponse.json("cookie fail", { status: 500 });
    }
}
