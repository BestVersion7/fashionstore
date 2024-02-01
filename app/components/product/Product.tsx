import Image from "next/image";
import { CartQPost } from "../cart/CartQPost";
import { formatCurrency, formatProductNameToUrl } from "../../utils/format";
import { PriceType, ProductAvailabilityType, ProductType } from "../../types";
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

export const Product = async (props: ProductType) => {
    // get the prices and availability
    const prices: PriceType = await getPriceById(props.default_price);
    const productAvailability: ProductAvailabilityType =
        await getProductAvailableQuantity(props.product_id);
    const reviewCount = await getProductReviewCount(props.product_id);
    const reviewRating = await getProductRatingAverage(props.product_id);

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
                    {formatCurrency(prices.unit_amount)}
                </p>

                {/* there is a bug here sometimes return {
  name: 'PrismaClientKnownRequestError',
  code: 'P1001',
  clientVersion: '5.9.0',
  meta: {
    modelName: 'ProductReviewInfo',
    database_host: 'aws-0-us-east-1.pooler.supabase.com',
    database_port: 5432
  }
} */}
                <ProductReviewStar
                    count={reviewCount ?? 0}
                    average={reviewRating}
                    link={`/${formatProductNameToUrl(props.name)}/${
                        props.product_id
                    }`}
                />
                <div>
                    {Number(productAvailability.available_quantity) > 0 ? (
                        <CartQPost
                            product_id={props.product_id}
                            price_id={props.default_price}
                            product_price={prices.unit_amount}
                        />
                    ) : (
                        <StockLabel />
                    )}
                </div>
            </div>
        </article>
    );
};
