import { CartQUpdate } from "./CartQUpdate";
import { CartType, ProductType } from "../types";
import { getProductAvailableQuantity, getProductById } from "../utils/apiCalls";
import { formatCurrency } from "../utils/format";
import Image from "next/image";
import { CartDeleteBtn } from "./CartDeleteBtn";

export const CartProducts = async (props: CartType) => {
    const productInfo: ProductType = await getProductById(props.product_id);
    const productAvailability = await getProductAvailableQuantity(
        props.product_id
    );

    return (
        <>
            <div className="grid grid-cols-[150px,_1fr]  gap-4 my-2 md:grid-cols-[220px,_1fr] md:h-44  ">
                <div className="relative ">
                    <Image
                        className="object-cover "
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        // height={"200"}
                        // width={"200"}
                        alt={productInfo.name}
                        src={productInfo.images[0]}
                    />
                </div>
                <div className="md:justify-between md:flex mr-3">
                    <div>
                        <p className="font-bold">{productInfo.name}</p>
                        <div className=" ">
                            <CartQUpdate {...props} />
                            <CartDeleteBtn product_id={props.product_id} />
                            {props.quantity > productAvailability && (
                                <p className="text-sm text-red-500">
                                    The quantity in your cart is greater than in
                                    stock {productAvailability}. Please update
                                    your cart.
                                </p>
                            )}
                        </div>
                    </div>
                    <p className="text-red-600 font-bold text-2xl ">
                        {formatCurrency(Number(props.product_price))}
                    </p>
                </div>
            </div>
            <hr className="h-[.1rem] bg-gray-300" />
        </>
    );
};
