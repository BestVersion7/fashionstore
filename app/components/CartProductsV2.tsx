import { CartType } from "../types";
import { getProductById } from "../utils/apiCalls";
import { formatCurrency } from "../utils/format";
import Image from "next/image";

export const CartProductsV2 = async (
    props: Pick<CartType, "product_id" | "quantity" | "product_price">
) => {
    const productInfo = await getProductById(props.product_id);
    return (
        <>
            <div className="grid grid-rows-2 md:grid-rows-1 md:grid-cols-[100px,_1fr] h-full gap-2 w-full ">
                <div className="relative h-28">
                    <Image
                        className="object-contain object-left"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        // height={"200"}
                        // width={"200"}
                        alt={productInfo.name}
                        src={productInfo.images[0]}
                    />
                </div>

                <div className="grid grid-cols-[80px,_1fr] text-left">
                    <span> Name:</span>
                    <span>{productInfo.name}</span>
                    <span> SKU:</span>
                    <span className="break-words overflow-hidden">
                        {productInfo.product_id}
                    </span>
                    <span>Quantity:</span>
                    <span>{props.quantity}</span>
                    <span>Price:</span>
                    <span> {formatCurrency(props.product_price)}</span>
                    <span>Subtotal:</span>
                    <span>
                        {formatCurrency(props.product_price * props.quantity)}
                    </span>
                </div>
                {/* <table className="">
                    <tbody className="">
                        <tr>
                            <td className="border border-black">
                                Product: {productInfo.name}
                            </td>
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
                </table> */}
            </div>
            <hr className="h-[.1rem] bg-black" />
        </>
    );
};
