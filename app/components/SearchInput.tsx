"use client";
import { IoSearchOutline } from "react-icons/io5";
import { useRef, useState } from "react";
import { getProductBySearchName } from "../utils/apiCalls";
import Link from "next/link";
import { ProductType } from "../types";

export const SearchInput = () => {
    const searchRef = useRef<HTMLInputElement>(null);
    const [productMap, setProductMap] = useState<ProductType[]>([]);
    const [showSearch, setShowSearch] = useState(true);

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setShowSearch(() => true);
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
                    showSearch &&
                    productMap.map((item, index) => (
                        <Link
                            className="p-2 grid text-orange-600 font-bold border border-solid border-black hover:cursor-pointer hover:bg-slate-300"
                            key={index}
                            href={`/shop/${item.metadata.category}/${item.id}`}
                            onClick={() => setShowSearch(() => false)}
                        >
                            {item.name}
                        </Link>
                    ))}
            </div>
        </div>
    );
};
