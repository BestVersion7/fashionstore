import { get24Products, getCountProduct } from "../utils/apiCalls";
import { ProductFilter } from "../components/product/ProductFilter";
import { Metadata } from "next";
import { ProductMapped } from "../components/product/ProductMapped";
import { Pagination } from "../components/helpers/Pagination";

export const metadata: Metadata = {
    title: "Shop",
    description: "No name, no brand, no premium clothing.",
};

export default async function Shop({
    searchParams,
}: {
    searchParams: { page: number };
}) {
    const page = searchParams.page || 1;
    const products = await get24Products(page);
    const count = await getCountProduct();
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
