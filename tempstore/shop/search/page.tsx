import {
    get24ProductsBySearchName,
    getCountProductBySearchName,
} from "@/app/utils/apiCalls";
import { ProductMapped } from "@/app/components/product/ProductMapped";
import { ProductFilter } from "@/app/components/product/ProductFilter";
import { Pagination } from "@/app/components/helpers/Pagination";

export default async function CategoryShop({
    searchParams,
}: {
    searchParams: { q: string; page: number };
}) {
    const page = searchParams.page || 1;

    const products = await get24ProductsBySearchName(searchParams.q, page);

    const count = await getCountProductBySearchName(searchParams.q);

    return (
        <>
            <Pagination count={count} take={24} />
            <ProductFilter />
            <ProductMapped products={products} />
            <div className="text-center">
                <Pagination count={count} take={24} />
            </div>
        </>
    );
}
