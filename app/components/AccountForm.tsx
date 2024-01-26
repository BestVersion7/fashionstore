"use client";
import { updateUserNameByEmail } from "../utils/apiCalls";
import { useRef, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { UserType } from "../types";
import { useRouter } from "next/navigation";

export const AccountForm = (props: UserType) => {
    const nameRef = useRef<HTMLInputElement>(null);
    const [showInput, setShowInput] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateUserNameByEmail(props.email, {
            name: nameRef.current?.value || "",
        });
        setShowInput(() => false);
        router.refresh();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex gap-2">
                <label>Name:</label>
                {showInput ? (
                    <input
                        defaultValue={props.name}
                        title="Name"
                        type="text"
                        ref={nameRef}
                        className="border border-black"
                    />
                ) : (
                    <span>{props.name}</span>
                )}
                <button
                    type="button"
                    title="Edit"
                    onClick={() => setShowInput((val) => !val)}
                >
                    <FaRegEdit className="text-orange-500" />
                </button>
                {showInput && (
                    <button
                        type="submit"
                        className="bg-orange-300 rounded-md px-2 hover:bg-orange-400"
                    >
                        Update
                    </button>
                )}
            </div>
            <div className="flex gap-3">
                <label>Email:</label>
                <span>{props.email}</span>
            </div>
        </form>
    );
};
