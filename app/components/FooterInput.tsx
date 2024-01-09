"use client";

import { IoMailUnreadOutline } from "react-icons/io5";

export const FooterInput = () => {
    const handleSubmitEmail = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // server call to create a customer
    };

    return (
        <>
            <div className="grid grid-cols-[50px,_1fr,auto] border border-solid border-white">
                <span className="text-3xl z-10">
                    <IoMailUnreadOutline />
                </span>
                <input
                    className="placeholder:text-inherit bg-inherit focus:outline-none"
                    placeholder="Enter your email"
                    type="text"
                />
                <button
                    className="px-2 bg-green-200 text-slate-800 font-medium hover:bg-green-400"
                    onClick={handleSubmitEmail}
                    type="submit"
                >
                    Submit
                </button>
            </div>
        </>
    );
};
