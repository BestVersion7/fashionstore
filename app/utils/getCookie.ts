import { cookies } from "next/headers";
import { getCookie } from "cookies-next";

export const getCookieServer = () => {
    const cookieId = cookies().get("cookiecart")?.value;
    return cookieId;
};

export const getCookieClient = () => {
    const cookieId = getCookie("cookiecart");
    return cookieId;
};
