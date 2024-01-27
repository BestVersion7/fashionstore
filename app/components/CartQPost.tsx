"use client";

import { useState, useRef } from "react";
import { CartType } from "../types";
import { FaAngleDown } from "react-icons/fa";
import { useOnClickOutside } from "../utils/customHooks";
import { AddCartBtn } from "./AddCartBtn";

export const CartQPost = (
    props: Pick<CartType, "product_id" | "price_id" | "product_price">
) => {
    const [quantity, setQuantity] = useState(1);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showInput, setShowInput] = useState(false);

    const dropdownRef = useRef(null);
    useOnClickOutside(dropdownRef, () => setShowDropdown(false));

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
        <div className="relative flex flex-col">
            <button
                type="button"
                onClick={() => setShowDropdown((val) => !val)}
                className="flex w-20 justify-center items-center border border-black border-solid bg-gray-200 shadow-md rounded-md px-1"
            >
                Qty: {quantity} <FaAngleDown />
            </button>

            {showDropdown && (
                <div className="absolute top-0 z-10" ref={dropdownRef}>
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
                        <ul className=" border-slate-700 border ">
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
            <div className="py-2">
                <AddCartBtn
                    product_id={props.product_id}
                    product_price={props.product_price}
                    quantity={quantity}
                    price_id={props.price_id}
                />
            </div>
        </div>
    );
};
