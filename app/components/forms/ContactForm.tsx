"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { createEmail } from "../../utils/apiCallsClient";
import { useOnClickOutside } from "../../utils/customHooks";
import { Modal } from "../helpers/Modal";

export const ContactForm = () => {
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const msgRef = useRef<HTMLTextAreaElement>(null);

    const formRef = useRef(null);
    const [completeForm, setCompleteForm] = useState(false);

    const router = useRouter();

    // useOnClickOutside(formRef, () => router.push("/"));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createEmail({
                name: nameRef.current?.value,
                email: emailRef.current?.value,
                message: msgRef.current?.value,
            });
            setCompleteForm(true);
        } catch (err) {
            alert(err);
        }
    };

    const handleClose = () => {
        router.push(window.location.pathname, { scroll: false });
    };
    return (
        <Modal height={80} width={80}>
            {completeForm ? (
                <div className=" text-center">
                    <p>
                        Your message has been sent. Please expect a response in
                        2-3 days.
                    </p>
                    <button
                        onClick={handleClose}
                        type="button"
                        className=" rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:cursor-pointer"
                    >
                        Close
                    </button>
                </div>
            ) : (
                <form
                    onSubmit={handleSubmit}
                    // className="flex flex-col justify-between"
                >
                    <h3
                        className="text-xl text-center font-semibold"
                        id="modal-title"
                    >
                        Contact me
                    </h3>
                    <label htmlFor="nameInput">Name:</label>
                    <br />
                    <input
                        id="nameInput"
                        className="w-full"
                        title="name"
                        type="text"
                        ref={nameRef}
                        required
                    />
                    <br />
                    <label htmlFor="emailInput">Email:</label>
                    <br />
                    <input
                        id="emailInput"
                        className="w-full"
                        title="Email"
                        type="text"
                        ref={emailRef}
                        required
                    />
                    <br />
                    <label htmlFor="msgInput">Message:</label>
                    <br />
                    <textarea
                        id="msgInput"
                        title="Message"
                        className="w-full h-24"
                        ref={msgRef}
                        required
                    />

                    <div className="flex justify-center gap-1">
                        <button
                            type="submit"
                            className="  rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 hover:cursor-pointer"
                        >
                            Send
                        </button>
                        <button
                            onClick={handleClose}
                            type="button"
                            className=" rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:cursor-pointer"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </Modal>
    );
};
