import { Products24Type } from "../../types";
import { Product } from "./Product";

export const ProductMapped = (props: { products: Products24Type[] }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  text-center py-3">
            {props.products.map((item, index) => (
                <Product key={index} {...item} />
            ))}
        </div>
    );
};

{
    /* <aside className="bg-red-300 w-auto">aside</aside> */
}
