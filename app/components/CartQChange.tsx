"use client";

import { useRouter } from "next/navigation";
import { updateCart, deleteCartItemByPriceId } from "../utils/serverAPICalls";
import { getCookie } from "cookies-next";
import { CartType } from "../types";

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
            ...props,
            quantity: Number(e.target.value),
        });

        router.refresh();
    };
    const handleDelete = async () => {
        console.log(getCookie("cookiecart"));
        // await deleteCartItemByPriceId(getCookie("cookiecart"), props.price_id);
        // router.refresh();
    };

    return (
        <>
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
                onClick={handleDelete}
                type="button"
                className="italic bg-inherit border-none font-medium text-xs text-red-500 hover:cursor-pointer hover:underline"
            >
                Delete
            </button>
        </>
    );
};
