import { getProductById } from "@/app/utils/apiCalls";
import { ProductType, PriceType, ProductReviewType } from "@/app/types";
import { ProductFilter } from "@/app/components/ProductFilter";
import {
    getProductReviews,
    getProductAvailableQuantity,
    getProductRatingAverage,
    getProductReviewCount,
    getPriceById,
} from "@/app/utils/apiCalls";
import Image from "next/image";
import { StockLabel } from "@/app/components/StockLabel";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { ReviewStar } from "@/app/components/ReviewStar";
import { CartQPost } from "@/app/components/CartQPost";
import { ProductReview } from "@/app/components/ProductReview";

// All products not returned in the api call will be 404
// export const dynamicParams = false;

// export async function generateStaticParams() {
//     const allProducts: ProductType[] = await getAllProducts();
//     return allProducts.map((item) => [
//         { category: item.metadata.category, id: item.id },
//     ]);
// }

export async function generateMetadata({
    params,
}: {
    params: { category: string };
}) {
    return {
        title: `Shop for ${
            params.category.charAt(0).toUpperCase() + params.category.slice(1)
        }`,
        description: `Shop for ${
            params.category.charAt(0).toUpperCase() + params.category.slice(1)
        }`,
        keywords: `Shop for ${
            params.category.charAt(0).toUpperCase() + params.category.slice(1)
        }`,
    };
}

export default async function CategoryShop({
    params,
}: {
    params: { category: string; product_id: string };
}) {
    const product: ProductType = await getProductById(params.product_id);

    // get the prices and availability
    const prices: PriceType = await getPriceById(product.default_price);
    const availableQuantity: number = await getProductAvailableQuantity(
        params.product_id
    );
    // get reviews
    const reviewCount = await getProductReviewCount(params.product_id);
    const reviewRating = await getProductRatingAverage(params.product_id);
    const reviews: ProductReviewType[] = await getProductReviews(
        params.product_id
    );

    return (
        <>
            <ProductFilter category={params.category} />

            <div className="rounded-md  my-3 flex gap-2">
                <div className="relative w-40">
                    <Image
                        className="object-contain object-top"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        src={product.images[0]}
                        alt={product.name}
                        priority
                    />
                </div>
                <div className=" px-4  flex flex-col gap-1">
                    <h2 className="leading-4 text-lg font-medium ">
                        {product.name}
                    </h2>
                    <p className="">{product.description}</p>
                    <p className="text-2xl  font-medium tracking-wide">
                        {formatCurrency(prices.unit_amount)}
                    </p>
                    <ReviewStar
                        count={reviewCount}
                        average={reviewRating}
                        link={`/shop/${product.metadata.category}/${product.product_id}`}
                    />
                    {availableQuantity ? (
                        <CartQPost
                            product_id={product.product_id}
                            price_id={product.default_price}
                            product_price={prices.unit_amount}
                        />
                    ) : (
                        <span className="mb-4 ">
                            <StockLabel quantity={availableQuantity} />
                        </span>
                    )}
                </div>
            </div>

            {/* Reviews */}
            <p>
                Average Rating:{" "}
                <span className="font-bold">{reviewRating}</span>
            </p>
            <h2>Reviews:</h2>
            <div>
                {reviews.map((item, index) => (
                    <ProductReview key={index} {...item} />
                ))}
            </div>
        </>
    );
}
