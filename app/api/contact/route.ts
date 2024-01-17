import sgMail from "@sendgrid/mail";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    const { name, email, message } = body;
    try {
        sgMail.setApiKey(`${process.env.SENDGRID_API_KEY}`);

        const msg = {
            from: "info@speedruntravel.com", // Change to your verified sender
            to: "info@speedruntravel.com", // Change to your recipient
            subject: `Message from ${email}`,
            text: `Name ${name} Message ${message}  Email ${email}`,
            html: `<div><h3>Name: ${name}</h3><p>Message: ${message}</p></div><p>Sent from:
            ${email}</p>`,
        };
        await sgMail.send(msg);
        return NextResponse.json("message sent");
    } catch (err) {
        return NextResponse.json("fail", { status: 500 });
    }
}
