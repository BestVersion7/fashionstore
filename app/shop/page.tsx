import { Product } from "../components/Product";
import { ProductType } from "../types";
import { getAllProducts } from "../utils/apiCalls";

export default async function Shop() {
    const products: ProductType[] = await getAllProducts();

    return (
        <main>
            {/* Product Page */}
            <div className="grid lg:grid-cols-3 gap-5">
                {products.map((item) => (
                    <Product key={item.id} {...item} />
                ))}
            </div>
        </main>
    );
}
