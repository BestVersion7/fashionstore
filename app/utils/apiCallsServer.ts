import { CartType } from "../types";
import { BASE_URL } from "../lib/constants";
import { cookies } from "next/headers";

export const getCookieServer = () => {
    const cookieId = cookies().get("cookiecart")?.value;
    return cookieId;
};

const stripeOrigin = `${BASE_URL}/api/stripe`;
const cartOrigin = `${BASE_URL}/api/cart`;

export const getCartTotalByCookie = async () => {
    const res = await fetch(
        `${cartOrigin}/total?cookie_id=${getCookieServer()}`,
        {
            cache: "no-cache",
        }
    );
    const data: number = await res.json();
    return data;
};

export const getCartByCookie = async () => {
    const res = await fetch(`${cartOrigin}?cookie_id=${getCookieServer()}`, {
        cache: "no-cache",
    });
    const data: CartType[] = await res.json();
    return data;
};

export const createOrFindPaymentIntent = async (amount: number) => {
    const res = await fetch(
        `${stripeOrigin}/paymentintent?cookie_id=${getCookieServer()}`,
        {
            method: "post",
            body: JSON.stringify({ amount }),
        }
    );
    const data: string = await res.json();
    return data;
};
