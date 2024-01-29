import { get24Products } from "../utils/apiCalls";
import { ProductFilter } from "../components/ProductFilter";
import { Metadata } from "next";
import { ProductMapped } from "../components/ProductMapped";

export const metadata: Metadata = {
    title: "Shop",
    description: "No name, no brand, no premium clothing.",
};

export default async function Shop({
    searchParams,
}: {
    searchParams: { page: number };
}) {
    const products = await get24Products(1);

    return (
        <>
            <ProductFilter />
            <ProductMapped products={products} />
        </>
    );
}
