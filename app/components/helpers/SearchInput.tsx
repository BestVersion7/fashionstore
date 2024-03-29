"use client";
import { IoSearchOutline } from "react-icons/io5";
import { useRef, useState, useCallback } from "react";
import { get5ProductsBySearchName } from "../../utils/apiCalls";
import Link from "next/link";
import { ProductType } from "../../types";
import { useRouter } from "next/navigation";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import Highlighter from "react-highlight-words";
import { useOnClickOutside } from "../../utils/customHooks";
import { useSearchParams } from "next/navigation";
import { formatProductNameToUrl, shortenTitle } from "../../utils/format";

export const SearchInput = () => {
    const searchRef = useRef<HTMLInputElement>(null);
    const [productMap, setProductMap] = useState<ProductType[]>([]);
    const [showSearch, setShowSearch] = useState(false);
    const dropdownRef = useRef(null);

    const query = useSearchParams().get("q");
    const router = useRouter();

    useOnClickOutside(dropdownRef || searchRef, () => setShowSearch(false));

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (!searchRef.current?.value) {
            return setProductMap([]);
        }
        setShowSearch(() => true);
        const products = await get5ProductsBySearchName(
            searchRef.current?.value
        );
        setProductMap(products);
    };

    // const handleClickInput = () => {
    //     setShowSearch(() => true);
    // };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.push(`/shop/search?q=${searchRef.current?.value}`);
        setShowSearch(() => false);
    };

    return (
        <div className="grid px-2 grid-cols-[45px,_1fr] relative">
            <span className="text-3xl text-black">
                <IoSearchOutline />
            </span>
            <form onSubmit={handleSearch} className="flex justify-between">
                <input
                    aria-label="Search"
                    placeholder="Search"
                    ref={searchRef}
                    defaultValue={query ?? ""}
                    onChange={handleChange}
                    // onClick={handleClickInput}
                    type="text"
                    name="search"
                    autoComplete="off"
                    spellCheck="false"
                    className="w-full bg-inherit text-lg text-black  focus:outline-none placeholder:text-slate-800 italic"
                />
                <button className=" text-green-700 text-2xl pl-2" type="submit">
                    <FaRegArrowAltCircleRight />
                    <span className="hidden">X</span>
                </button>
            </form>

            {showSearch && (
                <div
                    className="absolute w-full top-9 left-0 z-10 bg-slate-50"
                    ref={dropdownRef}
                >
                    {productMap.map((item, index) => (
                        <Link
                            className="p-2 grid text-orange-600 font-bold border border-solid border-black hover:cursor-pointer hover:bg-slate-300"
                            href={`/${formatProductNameToUrl(item.name)}/${
                                item.product_id
                            }`}
                            key={index}
                            onClick={() => setShowSearch(() => false)}
                        >
                            <Highlighter
                                highlightClassName="YourHighlightClass"
                                searchWords={[`${searchRef.current?.value}`]}
                                autoEscape={true}
                                textToHighlight={shortenTitle(item.name)}
                                // highlightStyle={{
                                // color: "rgb(234 88 12)",
                                // backgroundColor: "yellow",
                                // }}
                            />
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};
