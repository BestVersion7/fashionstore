import { ProductType } from "../types";
import { Product } from "./Product";

export const ProductMapped = (props: { products: ProductType[] }) => {
    return (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {props.products.map((item) => (
                <Product key={item.product_id} {...item} />
            ))}
        </div>
    );
};
