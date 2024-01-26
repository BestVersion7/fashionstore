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
import Link from "next/link";

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
        <article className="rounded-md border shadow-sm  my-3 flex flex-col">
            {/* only show when out of stock */}
            {/* <div className="absolute w-full top-0 z-10">
                <StockLabel quantity={availableQuantity} />
            </div> */}

            <Link
                href={`/${formatProductNameToUrl(props.name)}/${
                    props.product_id
                }`}
                className="relative h-56 "
            >
                <Image
                    // object-top
                    className="object-cover "
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    src={props.images[0]}
                    alt={props.name}
                    priority
                />
            </Link>
            <div className=" px-4 py-1 flex flex-col gap-1">
                <Link
                    href={`/${formatProductNameToUrl(props.name)}/${
                        props.product_id
                    }`}
                    className="text-lg font-medium hover:text-violet-600"
                >
                    {props.name}
                </Link>

                {/* <p className="">{props.description}</p> */}
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
