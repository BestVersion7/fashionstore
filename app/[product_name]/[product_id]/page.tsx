import { ProductFilter } from "@/app/components/ProductFilter";
import {
    getProductReviews,
    getProductAvailableQuantity,
    getProductRatingAverage,
    getProductReviewCount,
    getPriceById,
    getProductById,
    getPopularProducts,
} from "@/app/utils/apiCalls";
import Image from "next/image";
import { StockLabel } from "@/app/components/StockLabel";
import { formatCurrency, formatUrlToProductName } from "@/app/utils/format";
import { ProductReviewStar } from "@/app/components/ProductReviewStar";
import { CartQPost } from "@/app/components/CartQPost";
import { ProductReview } from "@/app/components/ProductReview";
import { FaStar } from "react-icons/fa";
import { ProductReviewForm } from "@/app/components/ProductReviewForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { SearchInput } from "@/app/components/SearchInput";
import { ProductPopularCard } from "@/app/components/ProductPopularCard";
import { GiClothes } from "react-icons/gi";
import { SignInBtn } from "@/app/components/SignInBtn";
import { PopularProductMap } from "@/app/components/PopularProductMap";

export async function generateMetadata({
    params,
}: {
    params: { product_name: string; product_id: string };
}) {
    return {
        title: `${formatUrlToProductName(params.product_name)}`,
        description: `${formatUrlToProductName(params.product_name)}`,
        keywords: `${formatUrlToProductName(params.product_name)}`,
    };
}

export default async function CategoryShop({
    params,
}: {
    params: { product_name: string; product_id: string };
}) {
    const product = await getProductById(params.product_id);

    // get the prices and availability
    const prices = await getPriceById(product.default_price);
    const availableQuantity = await getProductAvailableQuantity(
        params.product_id
    );
    // get reviews
    const reviewCount = await getProductReviewCount(params.product_id);
    const reviewRating = await getProductRatingAverage(params.product_id);
    const reviews = await getProductReviews(params.product_id);

    // pass down username
    const user = await getServerSession(authOptions);
    const email = user?.user?.email;

    // popular products
    const popularProducts = await getPopularProducts();
    const mappedProducts = popularProducts.map((item, index) => (
        <ProductPopularCard key={index} {...item} />
    ));

    return (
        <main>
            <h2 className="text-2xl mb-3 font-semibold  text-orange-600">
                Browse our collection
            </h2>
            <div className="border border-solid border-black bg-white py-1">
                <SearchInput />
            </div>
            <ProductFilter />

            <div className="my-3 grid grid-rows-[200px,auto] gap-2 sm:flex">
                <div className="relative sm:w-40">
                    <Image
                        className="object-contain object-left sm:object-top"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        src={product.images[0]}
                        alt={product.name}
                        priority
                    />
                </div>
                <div className="  flex flex-col gap-1">
                    <h2 className="leading-4 text-lg font-medium ">
                        {product.name}
                    </h2>
                    <p className="">{product.description}</p>
                    <p className="text-2xl  font-medium tracking-wide">
                        {formatCurrency(prices.unit_amount)}
                    </p>
                    <ProductReviewStar
                        count={reviewCount}
                        average={reviewRating}
                        link={`/${params.product_name}/${params.product_id}`}
                    />
                    {availableQuantity.available_quantity > 0 ? (
                        <CartQPost
                            product_id={product.product_id}
                            price_id={product.default_price}
                            product_price={prices.unit_amount}
                        />
                    ) : (
                        <span className="mb-4 ">
                            <StockLabel
                                quantity={Number(
                                    availableQuantity.available_quantity
                                )}
                            />
                        </span>
                    )}
                </div>
            </div>

            {/* popular */}
            <section>
                <div className="flex px-3 items-center text-xl py-1 text-white  bg-orange-600">
                    <GiClothes />
                    <h3 className=" font-medium ">Popular & Trending</h3>
                    <GiClothes />
                </div>
                <PopularProductMap cards={mappedProducts} />
            </section>

            {/* Reviews */}
            <section className="max-w-lg">
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

                {!email ? (
                    <>
                        <textarea
                            placeholder="Please sign in to comment."
                            rows={1}
                            className="border border-black px-2 w-full"
                            disabled={true}
                        />
                        <SignInBtn />
                    </>
                ) : (
                    <>
                        <ProductReviewForm
                            email={email}
                            product_id={params.product_id}
                        />
                    </>
                )}
                <h2 className="text-lg font-semibold">
                    Reviews ({reviewCount}):
                </h2>
                <div>
                    {reviews.map((item, index) => (
                        <ProductReview key={index} {...item} />
                    ))}
                </div>
            </section>
        </main>
    );
}
