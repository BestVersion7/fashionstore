"use client";

import { useState, memo, useEffect } from "react";
import { IoMdClose } from "react-icons/io";

type props = {
    message: string;
};

export const NotificationMsg = memo((props: props) => {
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
                <div className="min-w-72 flex justify-between items-center bg-green-400 rounded-md text-left px-4  text-lg font-medium">
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
});
