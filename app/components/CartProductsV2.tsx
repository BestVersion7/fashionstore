import { CartQChange } from "./CartQChange";
import { CartType, ProductType } from "../types";
import { getProductById } from "../utils/apiCalls";
import { formatCurrency } from "../utils/formatCurrency";
import Image from "next/image";

export const CartProductsV2 = async (
    props: Pick<CartType, "product_id" | "quantity" | "product_price">
) => {
    const productInfo: ProductType = await getProductById(props.product_id);

    return (
        <>
            <div className="grid grid-cols-[100px,_1fr] h-full gap-2 w-full bg-red-100 ">
                <div className="relative ">
                    <Image
                        className="object-cover absolute "
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        // height={"200"}
                        // width={"200"}
                        alt={productInfo.name}
                        src={productInfo.images[0]}
                    />
                </div>
                <table>
                    <tbody className="">
                        <tr>
                            <td>Product:</td>
                            <td>{productInfo.name}</td>
                        </tr>
                        <tr>
                            <td>Quantity:</td>
                            <td>{props.quantity}</td>
                        </tr>
                        <tr>
                            <td>Price:</td>
                            <td>
                                {formatCurrency(Number(props.product_price))}
                            </td>
                        </tr>
                        <tr>
                            <td>Subtotal:</td>
                            <td>
                                {formatCurrency(
                                    Number(props.product_price) * props.quantity
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {/* <hr className="h-[.1rem] bg-gray-300" /> */}
        </>
    );
};
