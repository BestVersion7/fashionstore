import {
    get24ProductsBySearchCategory,
    getCountProductBySearchCategory,
} from "@/app/utils/apiCalls";
import { ProductFilter } from "@/app/components/product/ProductFilter";
import { ProductMapped } from "@/app/components/product/ProductMapped";
import { Pagination } from "@/app/components/helpers/Pagination";

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
    searchParams,
}: {
    params: { category: string };
    searchParams: { page: number };
}) {
    const page = searchParams.page || 1;
    const products = await get24ProductsBySearchCategory(params.category, page);
    const count = await getCountProductBySearchCategory(params.category);
    return (
        <>
            <Pagination count={count} take={24} />
            <ProductFilter category={params.category} />
            <ProductMapped products={products} />
            <div className="text-center">
                <Pagination count={count} take={24} />
            </div>
        </>
    );
}
