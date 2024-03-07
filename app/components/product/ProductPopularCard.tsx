import Image from "next/image";
import { formatCurrency, formatProductNameToUrl } from "../../utils/format";
import {
    getPriceById,
    getProductReviewCount,
    getProductRatingAverage,
    getProductById,
    getProductAvailableQuantity,
    getQuantitySold,
} from "../../utils/apiCalls";
import { StockLabel } from "../helpers/StockLabel";
import { ProductReviewStar } from "../review/ProductReviewStar";
import Link from "next/link";
import { AddCartBtn } from "../cart/AddCartBtn";
import { FaFire } from "react-icons/fa";
import { PopularProductType } from "../../types";
import { CgUnavailable } from "react-icons/cg";

export const ProductPopularCard = async (props: PopularProductType) => {
    const productInfo = await getProductById(props.product_id);

    // remove inactive products
    if (!productInfo) {
        return <CgUnavailable className="text-3xl" />;
    }

    const prices = await getPriceById(productInfo.default_price);
    const availability = await getProductAvailableQuantity(props.product_id);

    // the quantity sold no cache so run again
    const quantitySold = await getQuantitySold(props.product_id);

    // get reviews
    const reviewCount = await getProductReviewCount(props.product_id);
    const reviewRating = await getProductRatingAverage(props.product_id);

    return (
        <article className=" pb-2 flex flex-col  ">
            <Link
                href={`/${formatProductNameToUrl(productInfo.name)}/${
                    props.product_id
                }`}
                className="relative h-44"
            >
                <Image
                    // object-top
                    className="object-contain "
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    src={productInfo.images[0]}
                    alt={productInfo.name}
                    priority
                    unoptimized
                />
            </Link>
            <div className="px-1 pt-1 flex flex-col  text-center items-center text-sm">
                <div className="flex italic px-1 bg-red-700 text-white font-medium rounded-lg items-center">
                    <FaFire />
                    {quantitySold} sold past month
                    <FaFire />
                </div>
                <Link
                    href={`/${formatProductNameToUrl(productInfo.name)}/${
                        props.product_id
                    }`}
                    className=" hover:text-violet-600 hidden"
                >
                    {productInfo.name}
                </Link>
                <div className="text-base">
                    <ProductReviewStar
                        count={reviewCount}
                        average={reviewRating}
                        link={`/${formatProductNameToUrl(productInfo.name)}/${
                            productInfo.product_id
                        }`}
                    />
                </div>
                <p className="text-lg font-medium tracking-wide">
                    {formatCurrency(prices.unit_amount)}
                </p>

                <div className="">
                    {availability.available_quantity > 0 ? (
                        <AddCartBtn
                            price_id={productInfo.default_price}
                            product_id={props.product_id}
                            product_price={prices.unit_amount}
                            quantity={1}
                        />
                    ) : (
                        <StockLabel />
                    )}
                </div>
            </div>
        </article>
    );
};
