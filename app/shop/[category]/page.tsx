import { getProductBySearchCategory } from "@/app/utils/apiCalls";
import { ProductType } from "@/app/types";
import { Product } from "@/app/components/Product";
import { SearchInput } from "@/app/components/SearchInput";
import { ProductFilter } from "@/app/components/ProductFilter";

// All products not returned in the api call will be 404
// export const dynamicParams = false;

export async function generateStaticParams() {
    return [
        {
            category: "tops",
        },
        {
            category: "dress",
        },
    ];
}

export async function generateMetadata({
    params,
}: {
    params: { category: string; id: string };
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
    params: { category: string };
}) {
    const products: ProductType[] = await getProductBySearchCategory(
        params.category
    );

    return (
        <main>
            <h2 className="text-2xl mb-3 font-semibold  text-orange-600">
                Browse our collection
            </h2>

            <div className="border border-solid border-black bg-white py-1">
                <SearchInput />
            </div>

            <ProductFilter category={params.category} />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {products.map((item) => (
                    <Product key={item.id} {...item} />
                ))}
            </div>
        </main>
    );
}
