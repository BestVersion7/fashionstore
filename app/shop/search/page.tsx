import { getProductBySearchName } from "@/app/utils/apiCallsServer";
import { ProductType } from "@/app/types";
import { ProductMapped } from "@/app/components/ProductMapped";
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
        <>
            <ProductFilter />
            <ProductMapped products={products} />
        </>
    );
}
