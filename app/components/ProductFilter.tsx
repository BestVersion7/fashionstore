"use client";

import Link from "next/link";

export const ProductFilter = (props: { category?: string }) => {
    const noHighlight =
        "border border-solid rounded-lg  border-black font-medium px-4 py-1 hover:bg-green-300 ";
    const highlight =
        "border border-solid rounded-lg bg-green-300 border-black font-medium px-4 py-1 hover:bg-green-300 ";

    return (
        <div className="flex items-center gap-4 mt-3">
            Filters:
            {["tops", "dress"].map((item) => (
                <Link
                    href={`/shop/${item}`}
                    key={item}
                    className={props.category == item ? highlight : noHighlight}
                >
                    {item}
                </Link>
            ))}
            <Link href="/shop" className="underline hover:text-red-600">
                Clear filters
            </Link>
        </div>
    );
};
