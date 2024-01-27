import { Product } from "../components/Product";
import { SearchInput } from "../components/SearchInput";
import { getAllProducts } from "../utils/apiCallsServer";
import { ProductFilter } from "../components/ProductFilter";
import { Metadata } from "next";
import { ProductMapped } from "../components/ProductMapped";

export const metadata: Metadata = {
    title: "Shop",
    description: "No name, no brand, no premium clothing.",
};

export default async function Shop() {
    const products = await getAllProducts();

    return (
        <>
            <ProductFilter />
            <ProductMapped products={products} />
        </>
    );
}
