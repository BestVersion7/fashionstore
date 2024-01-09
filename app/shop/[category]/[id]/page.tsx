import { getProductById, getAllProducts } from "@/app/utils/apiCalls";
import { ProductType } from "@/app/types";
import { Product } from "@/app/components/Product";
import Link from "next/link";
import { SearchInput } from "@/app/components/SearchInput";
import { ProductFilter } from "@/app/components/ProductFilter";

// All products not returned in the api call will be 404
export const dynamicParams = false;

export async function generateStaticParams() {
    const allProducts: ProductType[] = await getAllProducts();
    return allProducts.map((item) => [
        { id: item.id, category: item.metadata.category },
    ]);
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
    params: { category: string; id: string };
}) {
    const products: ProductType = await getProductById(params.id);

    return (
        <main>
            <h2 className="text-2xl font-semibold  text-blue-800">
                Browse our best selling products
            </h2>

            <div className="border border-solid border-black bg-white py-1">
                <SearchInput />
            </div>

            <ProductFilter category={params.category} />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {products.images ? (
                    <Product {...products} />
                ) : (
                    <Link
                        href="/"
                        className="underline text-2xl text-orange-600"
                    >
                        Back to Home
                    </Link>
                )}
            </div>
        </main>
    );
}
