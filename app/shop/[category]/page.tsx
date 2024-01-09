import { getProductBySearchCategory } from "@/app/utils/apiCalls";
import { ProductType } from "@/app/types";
import { Product } from "@/app/components/Product";

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
            {/* Product Page */}
            <h2 className="text-2xl font-semibold  text-blue-800">
                Browse our best selling products
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {products.map((item) => (
                    <Product key={item.id} {...item} />
                ))}
            </div>
        </main>
    );
}
