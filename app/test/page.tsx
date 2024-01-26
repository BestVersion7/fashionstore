"use client";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useState } from "react";

export default function TestPage() {
    const [rating, setRating] = useState(0);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setRating(Number(e.currentTarget.value));
    };

    return (
        <main>
            {/* <p>Test</p> */}
            <div className="flex dropdown relative gap-2">
                {[1, 2, 3, 4, 5].map((item) => (
                    <div key={item} className="p-0 m-0">
                        <button
                            onClick={handleClick}
                            title={`Rating ${item}`}
                            type="button"
                            value={item}
                        >
                            <FaRegStar />
                        </button>
                        <button
                            title={`Rating ${item}`}
                            type="button"
                            className={`${
                                item <= rating ? "block" : "hidden "
                            } `}
                        >
                            <FaStar />
                        </button>
                    </div>
                ))}
            </div>
            <div className="h-[500px]"></div>
        </main>
    );
}
