"use client";

import { useRouter } from "next/navigation";
import { updateCart, deleteCartItemByProductId } from "../utils/apiCalls";
import { CartType } from "../types";
import { getCookie } from "cookies-next";
import { useState, useRef, useCallback } from "react";
import { FaAngleDown } from "react-icons/fa";
import { useOnClickOutside } from "../utils/customHooks";

export const CartQChange = (props: CartType) => {
    const [inputQuantity, setInputQuantity] = useState(props.quantity);
    const [showInput, setShowInput] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showUpdateBtn, setShowUpdateBtn] = useState(false);

    const dropdownRef = useRef(null);
    useOnClickOutside(dropdownRef, () => setShowDropdown(false));

    const router = useRouter();

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShowUpdateBtn(() => true);
        setInputQuantity(Number(e.currentTarget.value));
    };

    const handleShowDropdown = () => {
        setShowDropdown((val) => !val);
    };

    // this is for the input form
    const handleFormUpdateQuantity = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateCart(getCookie("cookiecart"), {
            product_id: props.product_id,
            quantity: inputQuantity,
            purchased: false,
        });
        router.refresh();
    };

    const handleDropDownChangeQuantity = async (
        e: React.MouseEvent<HTMLLIElement>
    ) => {
        if (e.currentTarget.value !== 5) {
            // change the number for dropdown
            setInputQuantity(e.currentTarget.value);

            setShowDropdown(() => false);
            await updateCart(getCookie("cookiecart"), {
                product_id: props.product_id,
                quantity: Number(e.currentTarget.value),
                purchased: false,
            });
            router.refresh();
        } else {
            setShowInput(() => true);
        }
    };

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        await deleteCartItemByProductId(
            getCookie("cookiecart"),
            props.product_id
        );
        router.refresh();
    };

    return (
        <div className="relative">
            {props.quantity > 4 ? (
                <form
                    onSubmit={handleFormUpdateQuantity}
                    className="flex gap-2"
                >
                    <input
                        className=" w-20 border border-slate-500  pl-2 rounded-sm  focus:outline-none focus:shadow-[0px_1px_3px_0px] focus:shadow-yellow-500"
                        onChange={handleChangeInput}
                        title="quantity"
                        value={inputQuantity}
                        maxLength={2}
                    />
                    {showUpdateBtn && (
                        <button
                            className="bg-yellow-400 px-2 rounded-lg  hover:cursor-pointer hover:bg-orange-300"
                            type="submit"
                        >
                            Update
                        </button>
                    )}
                </form>
            ) : (
                <button
                    type="button"
                    onClick={handleShowDropdown}
                    className="flex w-20 justify-center items-center border border-black border-solid bg-gray-200 shadow-md rounded-md px-1"
                >
                    Qty: {inputQuantity} <FaAngleDown />
                </button>
            )}

            {/* dropdown list */}
            {showDropdown && (
                <div className="absolute top-0" ref={dropdownRef}>
                    {showInput ? (
                        <form
                            onSubmit={handleFormUpdateQuantity}
                            className="flex gap-2"
                        >
                            <input
                                className=" w-20 border border-slate-500  pl-2 rounded-sm  focus:outline-none focus:shadow-[0px_1px_3px_0px] focus:shadow-yellow-500"
                                onChange={handleChangeInput}
                                title="quantity"
                                value={inputQuantity}
                                maxLength={2}
                            />
                            <button
                                className="bg-yellow-400 px-2 rounded-lg  hover:cursor-pointer hover:bg-orange-300"
                                type="submit"
                            >
                                Update
                            </button>
                        </form>
                    ) : (
                        <ul className=" border-slate-700 border shadow-sm shadow-yellow-300">
                            {[1, 2, 3, 4, "5+"].map((item) => (
                                <li
                                    key={item}
                                    value={item}
                                    onClick={handleDropDownChangeQuantity}
                                    className={`${
                                        props.quantity == item
                                            ? "bg-green-100"
                                            : "bg-slate-200"
                                    } w-20 justify-between border border-b-slate-600 pl-2 hover:cursor-pointer hover:bg-green-200`}
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            <form onSubmit={handleDelete}>
                <button
                    type="submit"
                    className=" bg-inherit border-none font-medium text-xs text-blue-700 hover:cursor-pointer hover:underline"
                >
                    Delete
                </button>
            </form>
        </div>
    );
};
