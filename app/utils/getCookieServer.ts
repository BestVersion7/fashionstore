import { cookies } from "next/headers";

export const getCookieServer = () => {
    const cookieId = cookies().get("cookiecart")?.value;
    return cookieId;
};
