import { getPopularProducts } from "../../utils/apiCalls";
import { GiClothes } from "react-icons/gi";
import { ItemSwiper } from "../helpers/ItemSwiper";
import { ProductPopularCard } from "../../components/product/ProductPopularCard";

export const Trending = async () => {
    const popularProducts = await getPopularProducts();
    const mappedProducts = popularProducts.map((item, index) => (
        <ProductPopularCard key={index} {...item} />
    ));

    return (
        <div className="bg-gradient-to-r from-cyan-100 to-pink-200">
            <div className="flex items-center text-xl px-3 py-2 text-orange-600">
                <GiClothes />
                <h3 className="font-bold tracking-wider">Popular & Trending</h3>
                <GiClothes />
            </div>
            <div className=" mx-2 sm:mx-3 md:mx-4">
                {mappedProducts.length > 5 && (
                    <ItemSwiper cards={mappedProducts} />
                )}
            </div>
        </div>
    );
};
