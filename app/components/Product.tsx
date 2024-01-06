import Image from "next/image";
import { CartAddBtn } from "./CartAddBtn";
import { formatCurrency } from "../utils/formatCurrency";
import { PriceType, ProductType } from "../types";
import { getPriceById } from "../utils/apiCalls";

export const Product = async (props: ProductType) => {
    // get the prices
    const prices: PriceType = await getPriceById(props.default_price);

    return (
        <div className="rounded-md border-solid border-2 my-3 text-sm hover:bg-blue-300 hover:scale-[1.00] hover:cursor-pointer">
            <div className="relative min-h-40 bg-slate-300 ">
                <Image
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    src={props.images[0]}
                    alt={props.name}
                    priority
                />
            </div>
            <h2>{props.name}</h2>
            <p>{props.description}</p>
            <p>Cost: {formatCurrency(prices.unit_amount)}</p>

            <CartAddBtn
                product_id={props.id}
                price_id={props.default_price}
                product_price={prices.unit_amount}
                quantity={1}
            />
        </div>
    );
};
