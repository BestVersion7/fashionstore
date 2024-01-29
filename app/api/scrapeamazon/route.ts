import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

const url = "https://afashionstore.vercel.app/shop/tops";
// const url = "https://www.amazon.com/s?k=dress";

export async function GET() {
    try {
        // const data2 = await prisma.scrapeProductInfo.findFirst({
        //     where: {
        //         name: "rispy Creme",
        //     },
        // });
        // const data = JSON.parse(
        //     JSON.stringify(
        //         data2,
        //         (_, value) =>
        //             typeof value === "bigint" ? value.toString() : value // return everything else unchanged
        //     )
        // );
        // for (let i = 0; i < 4; i++) {
        //     if (!data) {
        //         console.log("f");
        //     } else {
        //         console.log("g");
        //     }
        // }
        return NextResponse.json("cav");
    } catch (err) {
        return NextResponse.json(err, { status: 500 });
    }
}

export async function POST() {
    try {
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();

        await page.goto(url);

        const data = await page.evaluate(() => {
            // test tags
            // const unit_amount2 = "p.text-2xl.font-medium";
            // const pName2 = "a.text-lg.font-medium";
            // const images2 = "img.object-contain";

            // amazon tags
            const unit_amount2 = "span.a-price-whole";
            const pName2 = "span.a-size-base-plus.a-color-base.a-text-normal";
            const images2 = "img.s-image";

            const amountArray = Array.from(
                document.querySelectorAll(unit_amount2)
            );
            const amountArrayMapped = amountArray.map((item) =>
                item.innerHTML.slice(0, 2)
            );
            const nameArray = Array.from(document.querySelectorAll(pName2));
            const nameArrayMapped = nameArray.map((item) => item.innerHTML);
            const imageArray = Array.from(document.querySelectorAll(images2));
            const imageArrayMapped = imageArray.map((item) =>
                item.getAttribute("src")
            );

            return { amountArrayMapped, nameArrayMapped, imageArrayMapped };
        });

        const { amountArrayMapped, nameArrayMapped, imageArrayMapped } = data;
        // saving to db
        const length = amountArrayMapped.length;

        for (let i = 0; i < length; i++) {
            const findProductName = await prisma.scrapeProductInfo.findFirst({
                where: {
                    name: nameArrayMapped[i],
                },
            });

            if (!findProductName) {
                await prisma.priceInfo.update({
                    data: {
                        unit_amount: Number(amountArrayMapped[i]) * 100,
                    },
                    where: {
                        price_id: i + 11,
                    },
                });
                const priceInfo = await prisma.priceInfo.create({
                    data: {
                        unit_amount: Number(amountArrayMapped[i]) * 100,
                    },
                    select: {
                        price_id: true,
                    },
                });
                await prisma.productInfo.create({
                    data: {
                        name: nameArrayMapped[i],
                        category: "tops",
                        default_price: priceInfo.price_id,
                        images: [`${imageArrayMapped[i]}`],
                    },
                });
            }
        }

        await browser.close();

        return NextResponse.json("saved");
    } catch (error) {
        return NextResponse.json(error, { status: 500 });
    }
}
