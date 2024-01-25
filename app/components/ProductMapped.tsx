import { ProductType } from "../types";
import { Product } from "./Product";

export const ProductMapped = (props: { products: ProductType[] }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
            {props.products.map((item) => (
                <Product key={item.product_id} {...item} />
            ))}
        </div>
    );
};
