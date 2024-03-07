import Image from "next/image";
import { CartQPost } from "../cart/CartQPost";
import { formatCurrency, formatProductNameToUrl } from "../../utils/format";
import { Products24Type } from "../../types";
import {
    getProductAvailableQuantity,
    getPriceById,
    getProductReviewCount,
    getProductRatingAverage,
} from "../../utils/apiCalls";
import { StockLabel } from "../helpers/StockLabel";
import { ProductReviewStar } from "../review/ProductReviewStar";
import Link from "next/link";
import { shortenTitle } from "../../utils/format";

export const Product = (props: Products24Type) => {
    const price =
        props.PriceInfo_ProductInfo_default_priceToPriceInfo.unit_amount;
    const productAvailability =
        props.ProductAvailabilityInfo.available_quantity;
    const reviewCount = props.ProductReviewInfo.length;
    const reviewRating =
        props.ProductReviewInfo.reduce(
            (arr, val) => arr + Number(val.review_star),
            0
        ) / reviewCount || 0;

    return (
        <article className="border grid grid-rows-[210px,auto]">
            <Link
                href={`/${formatProductNameToUrl(props.name)}/${
                    props.product_id
                }`}
                className="relative h-52 "
            >
                <Image
                    // object-top
                    className=" object-contain"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    src={props.images[0]}
                    alt={props.name}
                    priority
                    unoptimized
                />
            </Link>
            <div className=" flex flex-col gap-1 items-center">
                <Link
                    href={`/${formatProductNameToUrl(props.name)}/${
                        props.product_id
                    }`}
                    className="text-lg font-medium hover:text-violet-600 "
                >
                    {shortenTitle(props.name)}
                </Link>

                <p className="text-2xl  font-medium tracking-wide">
                    {formatCurrency(price)}
                </p>

                <ProductReviewStar
                    count={reviewCount}
                    average={reviewRating}
                    link={`/${formatProductNameToUrl(props.name)}/${
                        props.product_id
                    }`}
                />
                <div>
                    {Number(productAvailability) > 0 ? (
                        <CartQPost
                            product_id={props.product_id}
                            price_id={props.default_price}
                            product_price={price}
                        />
                    ) : (
                        <StockLabel />
                    )}
                </div>
            </div>
        </article>
    );
};
