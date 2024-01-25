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
import { FaStar } from "react-icons/fa";
import { ProductReviewForm } from "@/app/components/ProductReviewForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

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

    // pass down username
    const user = await getServerSession(authOptions);
    const email = user?.user?.email;

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
            <section className="max-w-lg">
                {!email ? (
                    <p>Please create an account to write a review</p>
                ) : (
                    <>
                        <h3 className="text-xl font-bold">
                            Please leave a review:
                        </h3>
                        <ProductReviewForm
                            email={email}
                            product_id={params.product_id}
                        />
                    </>
                )}

                <div>
                    <p className="flex gap-1 text-xl font-bold">
                        <span>Average Rating: </span>
                        <span className="flex items-center">
                            {reviewRating > 1
                                ? Number(reviewRating).toFixed(2)
                                : "Be the first to review."}
                            <span className="text-orange-400">
                                <FaStar />
                            </span>
                        </span>
                    </p>
                </div>
                <h2>Reviews ({reviewCount}):</h2>
                <div>
                    {reviews.map((item, index) => (
                        <ProductReview key={index} {...item} />
                    ))}
                </div>
            </section>
        </>
    );
}
