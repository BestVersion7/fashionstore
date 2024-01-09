import Image from "next/image";
import { CartAddBtn } from "./CartAddBtn";
import { formatCurrency } from "../utils/formatCurrency";
import { PriceType, ProductType } from "../types";
import { getPriceById } from "../utils/apiCalls";

export const Product = async (props: ProductType) => {
    // get the prices
    const prices: PriceType = await getPriceById(props.default_price);

    return (
        <article className="rounded-md border-black shadow-sm bg-green-50 border-solid border-2 my-3 ">
            <div className="relative h-72 border-b-2 border-black ">
                <Image
                    // object-top
                    className="object-cover "
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    src={props.images[0]}
                    alt={props.name}
                    priority
                />
            </div>
            <div className="text-center px-8 grid grid-rows-[70px,80px,_1fr,_2fr] items-center">
                <h2 className="text-2xl font-bold text-orange-600">
                    {props.name}
                </h2>

                {/* overflow-hidden */}
                <p className="font-thin text-xl overflow-hidden">
                    {props.description}
                </p>
                <p className="text-2xl text-purple-800 font-bold">
                    Price: {formatCurrency(prices.unit_amount)}
                </p>
                <CartAddBtn
                    product_id={props.id}
                    price_id={props.default_price}
                    product_price={prices.unit_amount}
                    quantity={1}
                    purchased={false}
                />
            </div>
        </article>
    );
};
