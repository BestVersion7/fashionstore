import Image from "next/image";
import { formatCurrency, formatProductNameToUrl } from "../utils/format";
import {
    getPriceById,
    getProductReviewCount,
    getProductRatingAverage,
    getProductById,
    getProductAvailableQuantity,
} from "../utils/apiCalls";
import { StockLabel } from "./StockLabel";
import { ProductReviewStar } from "./ProductReviewStar";
import Link from "next/link";
import { AddCartBtn } from "./AddCartBtn";
import { FaFire } from "react-icons/fa";

export const ProductPopularCard = async (props: {
    _sum: { quantity: number };
    product_id: string;
    index: number;
}) => {
    const productInfo = await getProductById(props.product_id);
    const prices = await getPriceById(productInfo.default_price);
    const availability = await getProductAvailableQuantity(props.product_id);

    // get reviews
    const reviewCount = await getProductReviewCount(props.product_id);
    const reviewRating = await getProductRatingAverage(props.product_id);

    return (
        <article
            id={`hot-${props.index}`}
            className=" border border-black pb-2 flex flex-col bg-green-100"
        >
            <Link
                href={`/${formatProductNameToUrl(productInfo.name)}/${
                    props.product_id
                }`}
                className="relative h-44"
            >
                <Image
                    // object-top
                    className="object-cover "
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    src={productInfo.images[0]}
                    alt={productInfo.name}
                    priority
                />
            </Link>
            <div className="px-1 pt-1 flex flex-col gap-1">
                <p className="flex italic bg-orange-200 font-semibold rounded-lg items-center justify-center">
                    <FaFire className="text-red-600" />
                    <span> {props._sum.quantity} sold past month</span>
                    <FaFire className="text-red-600" />
                </p>
                <Link
                    href={`/${formatProductNameToUrl(productInfo.name)}/${
                        props.product_id
                    }`}
                    className=" font-medium hover:text-violet-600"
                >
                    {productInfo.name}
                </Link>

                <ProductReviewStar
                    count={reviewCount}
                    average={reviewRating}
                    link={`/${formatProductNameToUrl(productInfo.name)}/${
                        productInfo.product_id
                    }`}
                />
                <p className=" font-medium tracking-wide">
                    {formatCurrency(prices.unit_amount)}
                </p>

                {availability.available_quantity ? (
                    <AddCartBtn
                        price_id={productInfo.default_price}
                        product_id={props.product_id}
                        product_price={prices.unit_amount}
                        quantity={1}
                    />
                ) : (
                    <span className="mb-4 ">
                        <StockLabel
                            quantity={availability.available_quantity}
                        />
                    </span>
                )}
            </div>
        </article>
    );
};
