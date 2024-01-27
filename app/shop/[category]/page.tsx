import { getProductBySearchCategory } from "@/app/utils/apiCalls";
import { ProductType } from "@/app/types";
import { SearchInput } from "@/app/components/SearchInput";
import { ProductFilter } from "@/app/components/ProductFilter";
import { ProductMapped } from "@/app/components/ProductMapped";

// All products not returned in the api call will be 404
export const dynamicParams = false;

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
    params: { category: string };
}) {
    const products = await getProductBySearchCategory(params.category);

    return (
        <>
            <ProductFilter category={params.category} />
            <ProductMapped products={products} />
        </>
    );
}
