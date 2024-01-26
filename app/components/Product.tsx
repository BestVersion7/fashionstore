import Image from "next/image";
import { CartQPost } from "./CartQPost";
import { formatCurrency, formatProductNameToUrl } from "../utils/format";
import { PriceType, ProductType } from "../types";
import {
    getProductAvailableQuantity,
    getPriceById,
    getProductReviewCount,
    getProductRatingAverage,
} from "../utils/apiCalls";
import { StockLabel } from "./StockLabel";
import { ProductReviewStar } from "./ProductReviewStar";

export const Product = async (props: ProductType) => {
    // get the prices and availability
    const prices: PriceType = await getPriceById(props.default_price);
    const availableQuantity: number = await getProductAvailableQuantity(
        props.product_id
    );
    // get reviews
    const reviewCount = await getProductReviewCount(props.product_id);
    const reviewRating = await getProductRatingAverage(props.product_id);

    return (
        <article className="rounded-md border shadow-sm  my-3 ">
            {/* only show when out of stock */}
            {/* <div className="absolute w-full top-0 z-10">
                <StockLabel quantity={availableQuantity} />
            </div> */}

            <div className="relative h-56 ">
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
            <div className=" px-4 py-1 flex flex-col gap-1">
                <h2 className="text-lg font-medium ">{props.name}</h2>

                <p className="">{props.description}</p>
                <p className="text-2xl  font-medium tracking-wide">
                    {formatCurrency(prices.unit_amount)}
                </p>
                <ProductReviewStar
                    count={reviewCount}
                    average={reviewRating}
                    link={`/${formatProductNameToUrl(props.name)}/${
                        props.product_id
                    }`}
                />
                {/* <p>{props.product_id}</p> */}
                {availableQuantity ? (
                    <CartQPost
                        product_id={props.product_id}
                        price_id={props.default_price}
                        product_price={prices.unit_amount}
                    />
                ) : (
                    <span className="mb-4 ">
                        <StockLabel quantity={availableQuantity} />
                    </span>
                )}
            </div>
        </article>
    );
};
