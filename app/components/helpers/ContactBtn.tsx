"use client";

import { IoIosText } from "react-icons/io";
import { useRouter, useSearchParams } from "next/navigation";
import { ContactForm } from "../cart/ContactForm";
import { Modal } from "./Modal";

export const ContactBtn = () => {
    const router = useRouter();
    const handleOpen = () => {
        router.push(`${window.location.pathname}?modal=t`, {
            scroll: false,
        });
    };
    const modal = useSearchParams().get("modal");
    return (
        <>
            {modal === "t" && (
                <Modal height={80} width={72}>
                    <ContactForm />
                </Modal>
            )}

            <button
                className="z-20 fixed flex items-center gap-2 bottom-4 right-4 text-xl p-4 bg-yellow-300 text-blue-800 font-bold rounded-xl hover:bg-yellow-400 hover:cursor-pointer"
                type="button"
                onClick={handleOpen}
            >
                Contact <IoIosText />
            </button>
        </>
    );
};
