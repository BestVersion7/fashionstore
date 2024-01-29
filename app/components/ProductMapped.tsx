import { ProductType } from "../types";
import { Product } from "./Product";

export const ProductMapped = (props: { products: ProductType[] }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  text-center py-3">
            {props.products.map((item) => (
                <Product key={item.product_id} {...item} />
            ))}
        </div>
    );
};

{
    /* <aside className="bg-red-300 w-auto">aside</aside> */
}
