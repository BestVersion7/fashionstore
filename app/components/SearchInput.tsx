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
        <div className="grid px-2 grid-cols-[45px,_1fr] relative">
            <span className="text-3xl text-black">
                <IoSearchOutline />
            </span>
            <input
                placeholder="Search"
                ref={searchRef}
                onChange={handleChange}
                type="text"
                className="w-full bg-inherit text-lg text-black  focus:outline-none placeholder:text-slate-800 italic"
            />

            <div className="absolute w-full top-9 left-0 z-10 bg-slate-50">
                {productMap &&
                    productMap.map((item, index) => (
                        <p
                            className="p-2 text-orange-600 font-bold border border-solid border-black hover:cursor-pointer hover:bg-slate-300"
                            key={index}
                        >
                            <span>{item.name}</span>
                        </p>
                    ))}
            </div>
        </div>
    );
};
