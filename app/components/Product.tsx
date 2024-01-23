import Image from "next/image";
import { CartQPost } from "./CartQPost";
import { formatCurrency } from "../utils/formatCurrency";
import { PriceType, ProductType } from "../types";
import { getProductAvailableQuantity, getPriceById } from "../utils/apiCalls";
import { StockLabel } from "./StockLabel";

export const Product = async (props: ProductType) => {
    // get the prices and availability
    const prices: PriceType = await getPriceById(props.default_price);
    const availableQuantity: number = await getProductAvailableQuantity(
        props.product_id
    );

    return (
        <article className="relative  rounded-md border-black shadow-sm bg-green-50 border-solid border-2 my-3 ">
            {/* only show when out of stock */}
            <div className="absolute w-full top-0 z-10">
                <StockLabel quantity={availableQuantity} />
            </div>

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
            {/* grid grid-rows-[70px,80px,_5px,_1fr,_2fr] */}
            <div className="text-center px-6 flex flex-col gap-2">
                <h2 className="text-xl font-bold text-orange-600">
                    {props.name}
                </h2>

                <p className="">{props.description}</p>
                <p className="text-2xl text-purple-800 font-bold">
                    {formatCurrency(prices.unit_amount)}
                </p>

                <CartQPost
                    product_id={props.product_id}
                    price_id={props.default_price}
                    product_price={prices.unit_amount}
                />
                {/* {availableQuantity ? (
                ) : (
                    <StockLabel quantity={availableQuantity} />
                )} */}
            </div>
        </article>
    );
};
