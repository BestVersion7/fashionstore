import { Product } from "../components/Product";
import { SearchInput } from "../components/SearchInput";
import { ProductType } from "../types";
import { getAllProducts } from "../utils/apiCalls";
import { ProductFilter } from "../components/ProductFilter";
import { ContactBtn } from "../components/ContactBtn";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Shop",
    description: "No name, no brand, no premium clothing.",
};

export default async function Shop() {
    const products: ProductType[] = await getAllProducts();

    return (
        <main>
            <h2 className="text-2xl mb-3 font-semibold  text-orange-600">
                Browse our collection
            </h2>

            <div className="border border-solid border-black bg-white py-1">
                <SearchInput />
            </div>

            <ProductFilter />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {products.map((item) => (
                    <Product key={item.id} {...item} />
                ))}
            </div>

            <ContactBtn />
        </main>
    );
}
