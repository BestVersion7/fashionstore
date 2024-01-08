"use client";

import { useState } from "react";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { createCart, createCartCookie } from "../utils/apiCalls";
import { CartType } from "../types";

export const CartAddBtn = (props: CartType) => {
    const [quantity, setQuantity] = useState(props.quantity);
    const [disableAdd, setDisableAdd] = useState(false);

    const router = useRouter();

    const handleChangeQuantity = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setQuantity(Number(e.target.value));
    };

    const handleAddCart = async () => {
        setDisableAdd(() => true);
        const cookieCart = getCookie("cookiecart");

        if (typeof cookieCart !== "undefined") {
            console.log("cookie already exist");
        } else {
            await createCartCookie();
            console.log("create cookie");
        }

        await createCart(getCookie("cookiecart"), {
            product_id: props.product_id,
            price_id: props.price_id,
            quantity,
            purchased: false,
        });

        router.refresh();
        setDisableAdd(() => false);
    };

    return (
        <div>
            <span>Quantity: </span>
            <select
                title="changeQ"
                onChange={handleChangeQuantity}
                name="quantity"
                id="quantity"
            >
                {[1, 2, 3, 4, 5].map((item) => (
                    <option key={item} value={item}>
                        {item}
                    </option>
                ))}
            </select>
            <br />
            <button
                type="button"
                className="bg-blue-200"
                onClick={handleAddCart}
                disabled={disableAdd}
            >
                Add to Cart
            </button>
        </div>
    );
};
