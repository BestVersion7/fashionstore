import { get24Products, getCountProduct } from "../utils/apiCalls";
import { ProductFilter } from "../components/ProductFilter";
import { Metadata } from "next";
import { ProductMapped } from "../components/ProductMapped";
import { Pagination } from "../components/Pagination";

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
            <Pagination page={count} />
            <ProductFilter />
            <ProductMapped products={products} />
            <div className="text-center">
                <Pagination page={count} />
            </div>
        </>
    );
}
