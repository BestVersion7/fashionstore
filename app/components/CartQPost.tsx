"use client";

import { useState, useRef } from "react";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { createCart, createCartCookie } from "../utils/apiCalls";
import { CartType } from "../types";
import { FaCheck, FaAngleDown } from "react-icons/fa";
import { useOnClickOutside } from "../utils/customHooks";

export const CartQPost = (
    props: Pick<
        CartType,
        "product_id" | "price_id" | "product_price" | "purchased"
    >
) => {
    const [quantity, setQuantity] = useState(1);
    const [disableAdd, setDisableAdd] = useState(false);
    const [inCart, setInCart] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showInput, setShowInput] = useState(false);

    const dropdownRef = useRef(null);
    useOnClickOutside(dropdownRef, () => setShowDropdown(false));

    const router = useRouter();

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

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuantity(Number(e.target.value));
    };

    const handleDropDownChangeQuantity = (
        e: React.MouseEvent<HTMLLIElement>
    ) => {
        if (e.currentTarget.value < 5) {
            setQuantity(e.currentTarget.value);
            setShowDropdown(() => false);
        } else {
            setShowInput(() => true);
        }
    };

    return (
        <div className="relative flex flex-col items-center">
            <button
                type="button"
                onClick={() => setShowDropdown((val) => !val)}
                className="flex w-20 justify-center items-center border border-black border-solid bg-gray-200 shadow-md rounded-md px-1"
            >
                Qty: {quantity} <FaAngleDown />
            </button>

            {showDropdown && (
                <div className="absolute top-0" ref={dropdownRef}>
                    {quantity > 5 ? (
                        <input
                            className=" w-20 border border-slate-500  pl-2 rounded-sm  focus:outline-none focus:shadow-[0px_1px_3px_0px] focus:shadow-yellow-500"
                            onChange={handleQuantityChange}
                            title="quantity"
                            defaultValue={quantity}
                            maxLength={2}
                        />
                    ) : showInput ? (
                        <input
                            className=" w-20 border border-slate-500  pl-2 rounded-sm  focus:outline-none focus:shadow-[0px_1px_3px_0px] focus:shadow-yellow-500"
                            onChange={handleQuantityChange}
                            title="quantity"
                            defaultValue={quantity}
                            maxLength={2}
                        />
                    ) : (
                        <ul className=" border-slate-700 border shadow-sm shadow-yellow-300">
                            {[1, 2, 3, 4, "5+"].map((item) => (
                                <li
                                    key={item}
                                    value={item}
                                    onClick={handleDropDownChangeQuantity}
                                    className="bg-slate-200 w-20 justify-between border border-b-slate-600 pl-2 hover:cursor-pointer hover:bg-green-200"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

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
