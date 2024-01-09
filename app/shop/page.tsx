import { Product } from "../components/Product";
import { SearchInput } from "../components/SearchInput";
import { ProductType } from "../types";
import { getAllProducts } from "../utils/apiCalls";

export default async function Shop() {
    const products: ProductType[] = await getAllProducts();

    return (
        <main>
            {/* Product Page */}
            <h2 className="text-2xl font-semibold  text-blue-800">
                Browse our best selling products
            </h2>

            <div className="border border-solid border-black bg-white py-1">
                <SearchInput />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {products.map((item) => (
                    <Product key={item.id} {...item} />
                ))}
            </div>
        </main>
    );
}
