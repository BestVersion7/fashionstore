"use client";

import { IoIosText } from "react-icons/io";
import { useRouter } from "next/navigation";
import { ContactForm } from "./ContactForm";
import { useSearchParams } from "next/navigation";

export const ContactBtn = () => {
    const router = useRouter();
    const handleOpen = () => {
        router.push(`${window.location.href}?modal=t`, {
            scroll: false,
        });
    };
    const modal = useSearchParams().get("modal");
    return (
        <>
            {modal === "t" && (
                <div
                    className="relative z-10"
                    aria-labelledby="modal-title"
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                    <div className="fixed px-3 flex flex-col justify-center inset-0 m-auto z-10 bg-blue-100 h-80 w-80 md:w-[400px] md:h-[400px]">
                        <ContactForm />
                    </div>
                </div>
            )}

            <button
                className="fixed flex items-center gap-2 bottom-4 right-4 text-xl p-4 bg-yellow-300 text-blue-800 font-bold rounded-xl hover:bg-yellow-400 hover:cursor-pointer"
                type="button"
                onClick={handleOpen}
            >
                Contact <IoIosText />
            </button>
        </>
    );
};