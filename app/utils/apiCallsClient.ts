import {
    CartType,
    OrderType,
    ProductReviewType,
    UserType,
    EmailProps,
} from "../types";
import { BASE_URL } from "../lib/constants";
import { notificationsArray } from "./notifications";
import { getCookie } from "cookies-next";

export const getCookieClient = () => {
    const cookieId = getCookie("cookiecart");
    return cookieId;
};

const emailOrigin = `${BASE_URL}/api/contact`;
const stripeOrigin = `${BASE_URL}/api/stripe`;
const cartOrigin = `${BASE_URL}/api/cart`;
const cartCookieOrigin = `${BASE_URL}/api/cartcookie`;
const orderOrigin = `${BASE_URL}/api/order`;
const productAvailabilityOrigin = `${BASE_URL}/api/productavailability`;
const userOrigin = `${BASE_URL}/api/user`;
const reviewOrigin = `${BASE_URL}/api/review`;

export const createCart = async (
    cart: Pick<CartType, "price_id" | "product_id" | "quantity">
) => {
    const res = await fetch(`${cartOrigin}?cookie_id=${getCookieClient()}`, {
        method: "POST",
        body: JSON.stringify(cart),
    });
    const data: string = await res.json();
    notificationsArray.push({ message: data });
    return data;
};

export const updateCart = async (
    cart: Pick<CartType, "product_id" | "quantity">
) => {
    const res = await fetch(`${cartOrigin}?cookie_id=${getCookieClient()}`, {
        method: "PUT",
        body: JSON.stringify(cart),
    });
    const data: string = await res.json();
    notificationsArray.push({ message: data });
    return data;
};

export const deleteCartItemByProductId = async (productId: string) => {
    const res = await fetch(`${cartOrigin}?cookie_id=${getCookieClient()}`, {
        method: "DELETE",
        body: JSON.stringify({ product_id: productId }),
    });
    const data: string = await res.json();
    notificationsArray.push({ message: data });
    return data;
};

export const getPaymentIntentFromCookie = async () => {
    const res = await fetch(
        `${cartCookieOrigin}?cookie_id=${getCookieClient()}`
    );
    const data: string = await res.json();
    return data;
};

export const updateProductAvailableQuantity = async (
    productId: string,
    quantity: number
) => {
    const res = await fetch(
        `${productAvailabilityOrigin}?product_id=${productId}`,
        {
            method: "put",
            body: JSON.stringify({
                quantity,
            }),
        }
    );
    const data: string = await res.json();
    return data;
};

export const createUser = async (email: string | undefined) => {
    const res = await fetch(userOrigin, {
        method: "post",
        body: JSON.stringify({ email }),
    });
    const data: string = await res.json();
    notificationsArray.push({ message: data });
    return data;
};

export const updateUserNameByEmail = async (
    email: string,
    body: Pick<UserType, "name">
) => {
    const res = await fetch(`${userOrigin}?email=${email}`, {
        method: "put",
        body: JSON.stringify(body),
    });
    const data: string = await res.json();
    notificationsArray.push({ message: data });
    return data;
};

export const createProductReview = async (
    product_id: string,
    reviewData: Pick<
        ProductReviewType,
        "product_id" | "review_message" | "review_star" | "user_email"
    >
) => {
    const res = await fetch(`${reviewOrigin}?product_id=${product_id}`, {
        method: "post",
        body: JSON.stringify(reviewData),
    });
    const data: { message: string; status: number } = await res.json();
    notificationsArray.push({ message: data.message });
    return data;
};

export const createEmail = async (props: EmailProps) => {
    const res = await fetch(emailOrigin, {
        method: "post",
        body: JSON.stringify(props),
    });
    const data: string = await res.json();
    return data;
};

export const createOrder = async (
    orderData: Pick<
        OrderType,
        "order_total" | "email" | "cookie_id" | "payment_intent"
    >
) => {
    const res = await fetch(orderOrigin, {
        method: "post",
        body: JSON.stringify(orderData),
    });
    const data: string = await res.json();
    notificationsArray.push({ message: data });
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
    const data: string = await res.json();
    return data;
};

export const createCartCookie = async () => {
    const res = await fetch(cartCookieOrigin, { method: "post" });
    const data: CartType = await res.json();
    return data;
};

export const deleteCartCookie = async () => {
    const res = await fetch(cartCookieOrigin, { method: "delete" });
    const data = await res.json();
    return data;
};

export const updateCartPurchased = async () => {
    const res = await fetch(
        `${cartOrigin}/purchased?cookie_id=${getCookieClient()}`,
        {
            method: "put",
        }
    );
    const data = await res.json();
    return data;
};
