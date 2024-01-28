import {
    CartType,
    OrderType,
    PaymentIntentType,
    ProductReviewType,
    ProductType,
    UserType,
    ProductAvailabilityType,
    PriceType,
    PopularProductType,
} from "../types";
import { BASE_URL } from "../lib/constants";

const stripeOrigin = `${BASE_URL}/api/stripe`;
const cartOrigin = `${BASE_URL}/api/cart`;
const orderOrigin = `${BASE_URL}/api/order`;
const productOrigin = `${BASE_URL}/api/product`;
const productAvailabilityOrigin = `${BASE_URL}/api/productavailability`;
const userOrigin = `${BASE_URL}/api/user`;
const reviewOrigin = `${BASE_URL}/api/review`;
const priceOrigin = `${BASE_URL}/api/price`;

const revalidateTime = 60 * 60 * 24 * 1;

export const getPaymentIntent = async (id: string) => {
    const res = await fetch(`${stripeOrigin}/paymentintent?id=${id}`);
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

export const getCartByCookieProp = async (cookieId: string) => {
    const res = await fetch(`${cartOrigin}?cookie_id=${cookieId}`, {
        cache: "no-cache",
    });
    const data: CartType[] = await res.json();
    return data;
};

export const getProductBySearchCategory = async (input: string | undefined) => {
    const res = await fetch(
        `${productOrigin}/search?product_category=${input}`,
        {
            next: { revalidate: revalidateTime },
        }
    );
    const data: ProductType[] = await res.json();
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
    const data: ProductReviewType[] = await res.json();
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

export const getCartTotal = async (cookieId: string) => {
    const res = await fetch(`${cartOrigin}/total?cookie_id=${cookieId}`, {
        cache: "no-cache",
    });
    const data: number = await res.json();
    return data;
};

export const getPopularProducts = async () => {
    const res = await fetch(`${cartOrigin}/purchased`, {
        next: {
            revalidate: revalidateTime,
        },
    });
    const data: PopularProductType[] = await res.json();
    return data;
};

export const getQuantitySold = async (productId: string) => {
    const res = await fetch(`${cartOrigin}/purchased?product_id=${productId}`, {
        cache: "no-cache",
    });
    const data: number = await res.json();
    return data;
};
