"use client";

import { useState, useEffect } from "react";

type props = {
    message: string;
    notificationReload: boolean;
};

export const NotificationMsg = (props: props) => {
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        setShowNotification(() => true);
        setTimeout(() => setShowNotification(() => false), 5000);
    }, [props.notificationReload]);

    return (
        <>
            {props.message && (
                <div className="fixed top-20 right-5 w-80  bg-green-600 rounded-md text-left pl-3 text-white font-medium z-20">
                    {showNotification && (
                        <p className="py-1">{props.message}</p>
                    )}
                </div>
            )}
        </>
    );
};
