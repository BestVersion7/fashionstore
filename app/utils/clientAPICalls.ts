import { CartType } from "../types";

let cartOrigin = "/api/cart";

// THESE ARE ALL CLIENT RENDERED SO WE ARE USING OWN API ROUTE
export const createCartCookie = async () => {
    const res = await fetch("/api/cookie", { method: "post" });
    const data = await res.json();
    return data;
};

export const deleteCartCookie = async () => {
    const res = await fetch("/api/cookie", { method: "delete" });
    const data = await res.json();
    return data;
};

export const createCart = async (
    cookie: string | undefined,
    cart: CartType
) => {
    const res = await fetch(`${cartOrigin}?cookie_id=${cookie}`, {
        method: "POST",
        body: JSON.stringify(cart),
    });
    const data = await res.json();
    return data;
};

export const updateCart = async (
    cookie: string | undefined,
    cart: Pick<CartType, "price_id" | "quantity">
) => {
    const res = await fetch(`${cartOrigin}?cookie_id=${cookie}`, {
        method: "PUT",
        body: JSON.stringify(cart),
    });
    const data = await res.json();
    return data;
};

export const deleteCartItemByPriceId = async (
    cookie: string | undefined,
    priceId: string
) => {
    const res = await fetch(`${cartOrigin}?cookie_id=${cookie}`, {
        method: "DELETE",
        body: JSON.stringify({ price_id: priceId }),
    });
    const data = await res.json();
    return data;
};
