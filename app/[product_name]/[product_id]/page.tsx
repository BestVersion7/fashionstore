import { ProductFilter } from "@/app/components/ProductFilter";
import {
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
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { SearchInput } from "@/app/components/SearchInput";
import { ProductPopularCard } from "@/app/components/ProductPopularCard";
import { GiClothes } from "react-icons/gi";
import { ProductSwiper } from "@/app/components/ProductSwiper";
import { ProductReview } from "@/app/components/ProductReview";

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
    const product = await getProductById(Number(params.product_id));

    // get the prices and availability
    const prices = await getPriceById(product.default_price);
    const availableQuantity = await getProductAvailableQuantity(
        Number(params.product_id)
    );

    // pass down username
    const user = await getServerSession(authOptions);
    const email = user?.user?.email;

    // popular products
    const popularProducts = await getPopularProducts();
    const mappedProducts = popularProducts.map((item, index) => (
        <ProductPopularCard key={index} {...item} />
    ));

    // get reviews
    const reviewCount = await getProductReviewCount(Number(params.product_id));
    const reviewRating = await getProductRatingAverage(
        Number(params.product_id)
    );

    // limit 10 reviews per page so get the page crumbs

    return (
        <main>
            <h2 className="text-2xl mb-3 font-semibold  text-orange-600">
                Browse our collection
            </h2>
            <div className="border border-solid border-black bg-white py-1">
                <SearchInput />
            </div>
            <ProductFilter />

            {/* product desc */}
            <div className="my-3 flex flex-col items-center text-center gap-2 md:flex-row md:items-start md:text-left">
                <div className="relative h-60 w-60 md:w-80 md:h-80">
                    <Image
                        className="object-contain object-top"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        src={product.images[0]}
                        alt={product.name}
                        priority
                    />
                </div>
                <div className="  flex flex-col gap-1 items-center md:items-start">
                    <h2 className="leading-4 text-2xl font-medium ">
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
                        <StockLabel />
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
                <ProductSwiper cards={mappedProducts} />
            </section>

            {/* Reviews */}
            <section className="max-w-4xl">
                <ProductReview
                    product_id={Number(params.product_id)}
                    email={email}
                />
            </section>
        </main>
    );
}
