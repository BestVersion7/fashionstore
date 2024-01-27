import {
    CartType,
    EmailProps,
    OrderType,
    PaymentIntentType,
    PriceType,
    ProductAvailabilityType,
    ProductReviewType,
    ProductType,
    UserType,
} from "../types";
import { BASE_URL } from "../lib/constants";
import { notificationsArray } from "./notifications";
import { getCookieClient, getCookieServer } from "./getCookie";

const emailOrigin = `${BASE_URL}/api/contact`;
const stripeOrigin = `${BASE_URL}/api/stripe`;
const cartOrigin = `${BASE_URL}/api/cart`;
const cartCookieOrigin = `${BASE_URL}/api/cartcookie`;
const orderOrigin = `${BASE_URL}/api/order`;
const productOrigin = `${BASE_URL}/api/product`;
const productAvailabilityOrigin = `${BASE_URL}/api/productavailability`;
const priceOrigin = `${BASE_URL}/api/price`;
const userOrigin = `${BASE_URL}/api/user`;
const reviewOrigin = `${BASE_URL}/api/review`;

const revalidateTime = 60 * 60 * 24 * 1;

export const getAllProducts = async () => {
    const res = await fetch(productOrigin, {
        next: { revalidate: revalidateTime },
    });
    const data: ProductType[] = await res.json();
    return data;
};

export const getProductById = async (id: string) => {
    const res = await fetch(`${productOrigin}?product_id=${id}`, {
        next: { revalidate: revalidateTime },
    });
    const data: ProductType = await res.json();
    return data;
};

export const getPriceById = async (id: string) => {
    const res = await fetch(`${priceOrigin}?price_id=${id}`, {
        next: { revalidate: revalidateTime },
    });
    const data: PriceType = await res.json();
    return data;
};

export const getCartTotal = async () => {
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
    const res = await fetch(`${cartOrigin}?cookie_id=${getCookieServer}`, {
        cache: "no-cache",
    });
    const data: CartType[] = await res.json();
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

export const createCart = async (
    cart: Pick<CartType, "price_id" | "product_id" | "quantity">
) => {
    const res = await fetch(`${cartOrigin}?cookie_id=${getCookieClient}`, {
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

export const updateQuantitySold = async (
    productId: string,
    quantity: number
) => {
    const res = await fetch(
        `${productAvailabilityOrigin}/quantitysold?product_id=${productId}`,
        { method: "put", body: JSON.stringify({ quantity }) }
    );
    const data: number = await res.json();
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

export const getPaymentIntent = async (id: string) => {
    const res = await fetch(`${stripeOrigin}/paymentintent?id=${id}`);
    const data: PaymentIntentType = await res.json();
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
    const data: PaymentIntentType = await res.json();
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

export const getPaymentIntentFromCookie = async () => {
    const res = await fetch(
        `${cartCookieOrigin}?cookie_id=${getCookieServer()}`
    );
    const data: PaymentIntentType = await res.json();
    return data;
};

export const getProductBySearchName = async (input: string | undefined) => {
    const res = await fetch(`${productOrigin}/search?product_name=${input}`, {
        next: { revalidate: revalidateTime },
    });
    const data: ProductType[] = await res.json();
    return data;
};

export const getProductBySearchCategory = async (input: string | undefined) => {
    const res = await fetch(
        `${productOrigin}/search?product_category=${input}`,
        {
            next: { revalidate: revalidateTime },
        }
    );
    const data: ProductType = await res.json();
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

export const getOrderByPaymentIntent = async (paymentIntent: string) => {
    const res = await fetch(`${orderOrigin}?payment_intent=${paymentIntent}`, {
        next: { revalidate: revalidateTime },
        headers: {
            authorization: `${process.env.API_KEY}`,
        },
    });
    const data: OrderType = await res.json();
    return data;
};

export const getOrdersByEmail = async (email: string) => {
    const res = await fetch(`${orderOrigin}?email=${email}`, {
        cache: "no-cache",
        headers: {
            authorization: `${process.env.API_KEY}`,
        },
    });
    const data: OrderType[] = await res.json();
    return data;
};

export const getProductAvailableQuantity = async (productId: string) => {
    const res = await fetch(
        `${productAvailabilityOrigin}?product_id=${productId}`,
        {
            cache: "no-cache",
        }
    );
    const data: ProductAvailabilityType = await res.json();
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

export const getProductReviewCount = async (product_id: string) => {
    const res = await fetch(`${reviewOrigin}/count?product_id=${product_id}`, {
        cache: "no-cache",
    });
    const data: number = await res.json();
    return data;
};

export const getProductRatingAverage = async (product_id: string) => {
    const res = await fetch(
        `${reviewOrigin}/averagerating?product_id=${product_id}`,
        {
            cache: "no-cache",
        }
    );
    const data: number = await res.json();
    return data;
};

export const getProductReviews = async (product_id: string) => {
    const res = await fetch(`${reviewOrigin}?product_id=${product_id}`, {
        cache: "no-cache",
    });
    const data: ProductReviewType = await res.json();
    return data;
};

export const getUserInfoByEmail = async (email: string) => {
    const res = await fetch(`${userOrigin}?email=${email}`, {
        // next: {
        //     revalidate: revalidateTime,
        // },
        headers: {
            authorization: `${process.env.API_KEY}`,
        },
        cache: "no-cache",
    });
    const data: UserType = await res.json();
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
    const data: { message: string } = await res.json();
    notificationsArray.push({ message: data.message });
    return data;
};
