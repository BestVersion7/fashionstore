import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

const url = "https://afashionstore.vercel.app/shop/tops";
const category = "";
// const url = `https://www.amazon.com/s?k=${category}`;

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
            const findProductName = await prisma.productInfo.findFirst({
                where: {
                    name: nameArrayMapped[i],
                },
            });

            if (!findProductName) {
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
                        category,
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
