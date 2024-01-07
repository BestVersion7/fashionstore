"use client";

import { useRouter } from "next/navigation";
import { updateCart, deleteCartItemByProductId } from "../utils/apiCalls";
import { CartType } from "../types";
import { getCookie } from "cookies-next";

export const CartQChange = (props: CartType) => {
    let quantityMap = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    const findQ = quantityMap.indexOf(Number(props.quantity));
    quantityMap.splice(findQ, 1);
    quantityMap.unshift(Number(props.quantity));
    const router = useRouter();

    const handleChangeQuantity = async (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        await updateCart(getCookie("cookiecart"), {
            price_id: props.price_id,
            quantity: Number(e.target.value),
        });

        router.refresh();
    };
    const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
        // e.preventDefault();
        await deleteCartItemByProductId(
            getCookie("cookiecart"),
            props.product_id
        );
        // router.refresh();
    };

    return (
        <form onSubmit={handleDelete}>
            <select
                title="changeQ"
                onChange={handleChangeQuantity}
                name="quantity"
                id="quantity"
            >
                {quantityMap.map((item) => (
                    <option key={item} value={item}>
                        {item}
                    </option>
                ))}
            </select>
            <button
                type="submit"
                className="italic bg-inherit border-none font-medium text-xs text-red-500 hover:cursor-pointer hover:underline"
            >
                Delete
            </button>
        </form>
    );
};
