import { CartType, EmailProps, OrderType } from "../types";
import { BASE_URL } from "../lib/constants";

const emailOrigin = `${BASE_URL}/api/contact`;
const stripeOrigin = `${BASE_URL}/api/stripe`;
const cartOrigin = `${BASE_URL}/api/cart`;
const cartCookieOrigin = `${BASE_URL}/api/cartcookie`;
const orderOrigin = `${BASE_URL}/api/order`;
const productOrigin = `${BASE_URL}/api/product`;
const priceOrigin = `${BASE_URL}/api/price`;

const revalidateTime = 60 * 60 * 24 * 1;

export const getAllProducts = async () => {
    const res = await fetch(productOrigin, {
        next: { revalidate: revalidateTime },
    });
    const data = await res.json();
    return data;
};

export const getProductById = async (id: string) => {
    const res = await fetch(`${productOrigin}?product_id=${id}`, {
        next: { revalidate: revalidateTime },
    });
    const data = await res.json();
    return data;
};

export const getPriceById = async (id: string) => {
    const res = await fetch(`${priceOrigin}?price_id=${id}`, {
        next: { revalidate: revalidateTime },
    });
    const data = await res.json();
    return data;
};

export const getCartTotal = async (cookie: string | undefined) => {
    const res = await fetch(`${cartOrigin}/total?cookie_id=${cookie}`, {
        cache: "no-cache",
    });
    const data = await res.json();
    return data;
};

export const getCartByCookie = async (cookie: string | undefined) => {
    const res = await fetch(`${cartOrigin}?cookie_id=${cookie}`, {
        cache: "no-cache",
    });
    const data = await res.json();
    return data;
};

export const createCartCookie = async () => {
    const res = await fetch(cartCookieOrigin, { method: "post" });
    const data = await res.json();
    return data;
};

export const deleteCartCookie = async () => {
    const res = await fetch(cartCookieOrigin, { method: "delete" });
    const data = await res.json();
    return data;
};

export const createCart = async (
    cookieId: string | undefined,
    cart: Pick<CartType, "price_id" | "product_id" | "quantity" | "purchased">
) => {
    const res = await fetch(`${cartOrigin}?cookie_id=${cookieId}`, {
        method: "POST",
        body: JSON.stringify(cart),
    });
    const data = await res.json();
    return data;
};

export const updateCart = async (
    cookieId: string | undefined,
    cart: Pick<CartType, "product_id" | "quantity" | "purchased">
) => {
    const res = await fetch(`${cartOrigin}?cookie_id=${cookieId}`, {
        method: "PUT",
        body: JSON.stringify(cart),
    });
    const data = await res.json();
    return data;
};

export const updateCartPurchased = async (
    cookieId: string | undefined,
    cart: Pick<CartType, "purchased">
) => {
    const res = await fetch(`${cartOrigin}?cookie_id=${cookieId}`, {
        method: "PUT",
        body: JSON.stringify(cart),
    });
    const data = await res.json();
    return data;
};

export const deleteCartItemByProductId = async (
    cookieId: string | undefined,
    productId: string
) => {
    const res = await fetch(`${cartOrigin}?cookie_id=${cookieId}`, {
        method: "DELETE",
        body: JSON.stringify({ product_id: productId }),
    });
    const data = await res.json();
    return data;
};

export const getPaymentIntent = async (id: string) => {
    const res = await fetch(`${stripeOrigin}/paymentintent?id=${id}`);
    const data = await res.json();
    return data;
};

export const createOrFindPaymentIntent = async (
    cookieId: string | undefined,
    amount: number
) => {
    const res = await fetch(
        `${stripeOrigin}/paymentintent?cookie_id=${cookieId}`,
        {
            method: "post",
            body: JSON.stringify({ amount }),
        }
    );
    const data = await res.json();
    return data;
};

export const updatePaymentIntent = async (
    id: string,
    body: {
        email: string | undefined;
        amount: number;
    }
) => {
    const res = await fetch(`${stripeOrigin}/paymentintent?payment_id=${id}`, {
        method: "put",
        body: JSON.stringify(body),
    });
    const data = await res.json();
    return data;
};

export const getPaymentIntentFromCookie = async (
    cookieId: string | undefined
) => {
    const res = await fetch(`${cartCookieOrigin}?cookie_id=${cookieId}`);
    const data = await res.json();
    return data;
};

export const getProductBySearchName = async (input: string | undefined) => {
    const res = await fetch(`${productOrigin}/search?product_name=${input}`, {
        next: { revalidate: revalidateTime },
    });
    const data = await res.json();
    return data;
};

export const getProductBySearchCategory = async (input: string | undefined) => {
    const res = await fetch(
        `${productOrigin}/search?product_category=${input}`,
        {
            next: { revalidate: revalidateTime },
        }
    );
    const data = await res.json();
    return data;
};

export const createEmail = async (props: EmailProps) => {
    const res = await fetch(emailOrigin, {
        method: "post",
        body: JSON.stringify(props),
    });
    const data = await res.json();
    return data;
};

export const createOrder = async (
    orderData: Pick<
        OrderType,
        "order_total" | "email" | "order_items" | "payment_intent"
    >
) => {
    const res = await fetch(orderOrigin, {
        method: "post",
        body: JSON.stringify(orderData),
    });
    const data = await res.json();
    return data;
};

export const getOrderByPaymentIntent = async (paymentIntent: string) => {
    const res = await fetch(`${orderOrigin}?payment_intent=${paymentIntent}`, {
        next: { revalidate: revalidateTime },
        headers: {
            authorization: `${process.env.API_KEY}`,
        },
    });
    const data = await res.json();
    return data;
};

export const getOrdersByEmail = async (email: string) => {
    const res = await fetch(`${orderOrigin}?email=${email}`, {
        cache: "no-cache",
        headers: {
            authorization: `${process.env.API_KEY}`,
        },
    });
    const data = await res.json();
    return data;
};
