import { getProductById } from "@/app/utils/apiCalls";
import { ProductType } from "@/app/types";
import { ProductFilter } from "@/app/components/ProductFilter";
import { ProductMapped } from "@/app/components/ProductMapped";

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
    const products: ProductType = await getProductById(params.product_id);

    return (
        <>
            <ProductFilter category={params.category} />

            <ProductMapped products={[products]} />
        </>
    );
}
