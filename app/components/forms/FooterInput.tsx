"use client";

import { IoMailUnreadOutline } from "react-icons/io5";
import { createEmail } from "../../utils/apiCallsClient";
import { useRef, useState } from "react";
import { Modal } from "../helpers/Modal";

export const FooterInput = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const [showModal, setShowModal] = useState(false);

    const handleSubmitEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createEmail({
                name: "random",
                email: emailRef.current?.value,
                message: "Footer email input",
            });
            setShowModal(true);
        } catch (err) {
            alert(err);
        }
    };

    if (showModal) {
        return (
            <Modal height={24} width={80}>
                <div className="text-black text-center">
                    <p>Thanks for subscribing.</p>
                    <button
                        onClick={() => setShowModal(false)}
                        type="button"
                        className=" rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:cursor-pointer"
                    >
                        Close
                    </button>
                </div>
            </Modal>
        );
    }

    return (
        <form
            onSubmit={handleSubmitEmail}
            className="grid grid-cols-[50px,_1fr,auto] border border-solid border-white"
        >
            <span className="text-3xl z-10">
                <IoMailUnreadOutline />
            </span>
            <input
                className="placeholder:text-inherit bg-inherit focus:outline-none"
                placeholder="Enter your email"
                type="text"
                name="email"
                autoComplete="on"
                ref={emailRef}
            />
            <button
                className="px-2 bg-green-200 text-slate-800 font-medium hover:bg-green-400"
                type="submit"
            >
                Submit
            </button>
        </form>
    );
};
