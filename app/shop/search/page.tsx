import { getProductBySearchName } from "@/app/utils/apiCalls";
import { ProductType } from "@/app/types";
import { Product } from "@/app/components/Product";
import { SearchInput } from "@/app/components/SearchInput";
import { ProductFilter } from "@/app/components/ProductFilter";

export default async function CategoryShop({
    searchParams,
}: {
    searchParams: { q: string };
}) {
    const products: ProductType[] = await getProductBySearchName(
        searchParams.q
    );

    return (
        <main>
            <h2 className="text-2xl mb-3 font-semibold  text-orange-600">
                Browse our collection
            </h2>

            <div className="border border-solid border-black bg-white py-1">
                <SearchInput />
            </div>

            <ProductFilter />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {products.map((item) => (
                    <Product key={item.product_id} {...item} />
                ))}
            </div>
        </main>
    );
}
