"use client";

import { memo, useState } from "react";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { createCart, createCartCookie } from "../../utils/apiCallsClient";
import { CartType } from "../../types";
import { FaCheck } from "react-icons/fa";

export const AddCartBtn = memo(
    (
        props: Pick<
            CartType,
            "product_id" | "price_id" | "product_price" | "quantity"
        >
    ) => {
        const [disableAdd, setDisableAdd] = useState(false);
        const [inCart, setInCart] = useState(false);

        const router = useRouter();

        const handleAddCart = async () => {
            setDisableAdd(() => true);
            const cookieCart = getCookie("cookiecart");

            if (typeof cookieCart !== "undefined") {
                console.log("cookie already exist");
            } else {
                await createCartCookie();
                console.log("create cookie");
            }

            await createCart({
                product_id: props.product_id,
                price_id: props.price_id,
                quantity: props.quantity,
            });

            router.refresh();
            setInCart(() => true);
            setDisableAdd(() => false);
        };

        return (
            <button
                type="button"
                className="bg-yellow-400  rounded-2xl px-3 font-medium py-1 hover:bg-yellow-500"
                onClick={handleAddCart}
                disabled={disableAdd}
            >
                <span className="flex gap-1 items-center">
                    {inCart ? `Added` : `Add to cart`}

                    {inCart && <FaCheck />}
                </span>
            </button>
        );
    }
);
