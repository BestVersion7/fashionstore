"use client";

import { getCookie } from "cookies-next";

export const getCookieClient = () => {
    const cookieId = getCookie("cookiecart");
    return cookieId;
};
