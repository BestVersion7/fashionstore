"use client";
import { IoSearchOutline } from "react-icons/io5";
import { useRef, useState } from "react";
import { getProductBySearchName } from "../utils/apiCalls";

export const SearchInput = () => {
    const searchRef = useRef<HTMLInputElement>(null);
    const [productMap, setProductMap] = useState<{ name: string }[]>([]);

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const products = await getProductBySearchName(searchRef.current?.value);
        setProductMap(products);
    };

    return (
        <div className="relative md:flex justify-end hidden ">
            <span className="text-3xl">
                <IoSearchOutline />
            </span>
            <input
                placeholder="Search"
                ref={searchRef}
                onChange={handleChange}
                type="text"
                className=" text-lg pl-4 w-44 border-slate-400 border-2 border-solid"
            />

            <div className="absolute top-7 z-10 bg-slate-50">
                {productMap &&
                    productMap.map((item, index) => (
                        <p
                            className="p-2 border border-solid border-black hover:cursor-pointer hover:bg-yellow-200"
                            key={index}
                        >
                            <span>{item.name}</span>
                        </p>
                    ))}
            </div>
        </div>
    );
};
