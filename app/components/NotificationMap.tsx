"use client";

import { NotificationMsg } from "./NotificationMsg";
import { notificationsArray } from "../utils/notifications";

export const NotificationMap = () => {
    return (
        <div className="fixed top-20 z-30 right-2 flex flex-col-reverse gap-2">
            {notificationsArray.map((item, index) => {
                return <NotificationMsg key={index} message={item.message} />;
            })}
        </div>
    );
};
