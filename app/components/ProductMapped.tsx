import { ProductType } from "../types";
import { Product } from "./Product";

export const ProductMapped = (props: { products: ProductType[] }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 text-center py-3">
            {props.products.map((item) => (
                <Product key={item.product_id} {...item} />
            ))}
        </div>
    );
};
