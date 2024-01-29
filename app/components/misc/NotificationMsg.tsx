"use client";

import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";

export const NotificationMsg = (props: { message: string }) => {
    const [showNotification, setShowNotification] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setShowNotification(() => false);
        }, 5000);
    }, []);

    const handleShowNotification = () => {
        setShowNotification(() => false);
    };

    return (
        <>
            {showNotification && (
                <div className="min-w-72 flex justify-between items-center bg-yellow-300 rounded-md text-left px-4  text-lg font-medium">
                    <p className="py-1">{props.message}</p>
                    <span
                        onClick={handleShowNotification}
                        className="text-2xl hover:bg-white hover:cursor-pointer"
                    >
                        <IoMdClose />
                    </span>
                </div>
            )}
        </>
    );
};
