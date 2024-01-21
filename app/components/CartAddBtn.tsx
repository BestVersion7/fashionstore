"use client";

import { useState } from "react";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { createCart, createCartCookie } from "../utils/apiCalls";
import { CartType } from "../types";
import { FaCheck } from "react-icons/fa";

export const CartAddBtn = (
    props: Pick<
        CartType,
        "product_id" | "price_id" | "product_price" | "quantity" | "purchased"
    >
) => {
    const [quantity, setQuantity] = useState(props.quantity);
    const [disableAdd, setDisableAdd] = useState(false);
    const [inCart, setInCart] = useState(false);

    const router = useRouter();

    const handleChangeQuantity = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setQuantity(Number(e.target.value));
    };

    const handleAddCart = async () => {
        setInCart(() => true);
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
                className="bg-yellow-100 border-2 py-1 px-2 border-black hover:cursor-pointer "
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

            <div>
                <button
                    type="button"
                    className="bg-orange-300 mt-2 mb-3 border border-black px-4 py-2 hover:bg-orange-400"
                    onClick={handleAddCart}
                    disabled={disableAdd}
                >
                    <span className="flex gap-2 text-xl font-medium items-center">
                        {inCart ? `Added` : `Add to Cart`}

                        {inCart && (
                            <span className="text-2xl">
                                <FaCheck />
                            </span>
                        )}
                    </span>
                </button>
            </div>
        </div>
    );
};
