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

// const revalidateTime = 1;
const revalidateTime = 60 * 60 * 24 * 2;

export const getPaymentIntent = async (id: string) => {
    const res = await fetch(`${stripeOrigin}/paymentintent?id=${id}`, {
        // next: {revalidate: revalidateTime}
    });
    const data: PaymentIntentType = await res.json();
    return data;
};

export const get24ProductsBySearchName = async (
    input: string | undefined,
    page: number
) => {
    const res = await fetch(
        `${productOrigin}/search?product_name=${input}&count=24&page=${page}`,
        {
            next: { revalidate: revalidateTime },
        }
    );
    const data: ProductType[] = await res.json();
    return data;
};
export const get5ProductsBySearchName = async (input: string | undefined) => {
    const res = await fetch(
        `${productOrigin}/search?product_name=${input}&count=5&page=1`,
        {
            next: { revalidate: revalidateTime },
        }
    );
    const data: ProductType[] = await res.json();
    return data;
};

export const get24Products = async (page: number) => {
    const res = await fetch(`${productOrigin}?page=${page}`, {
        next: { revalidate: revalidateTime },
    });
    const data: ProductType[] = await res.json();
    return data;
};

export const getCountProduct = async () => {
    const res = await fetch(`${productOrigin}/count`, {
        cache: "no-cache",
    });
    const data: number = await res.json();
    return data;
};
export const getCountProductBySearchName = async (productName: string) => {
    const res = await fetch(
        `${productOrigin}/count?product_name=${productName}`,
        {
            cache: "no-cache",
        }
    );
    const data: number = await res.json();
    return data;
};
export const getCountProductBySearchCategory = async (category: string) => {
    const res = await fetch(
        `${productOrigin}/count?product_category=${category}`,
        {
            cache: "no-cache",
        }
    );
    const data: number = await res.json();
    return data;
};

export const getProductById = async (id: number) => {
    const res = await fetch(`${productOrigin}?product_id=${id}`, {
        next: { revalidate: revalidateTime },
    });
    const data: ProductType = await res.json();
    return data;
};

export const getPriceById = async (id: number) => {
    const res = await fetch(`${priceOrigin}?price_id=${id}`, {
        // next: { revalidate: revalidateTime },
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

export const get24ProductsBySearchCategory = async (
    input: string | undefined,
    page: number
) => {
    const res = await fetch(
        `${productOrigin}/search?product_category=${input}&page=${page}`,
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

export const getOrdersByEmail = async (email: string, page: number) => {
    const res = await fetch(`${orderOrigin}?email=${email}&page=${page}`, {
        cache: "no-cache",
        headers: {
            authorization: `${process.env.API_KEY}`,
        },
    });
    const data: OrderType[] = await res.json();
    return data;
};

export const getOrderCountByEmail = async (email: string) => {
    const res = await fetch(`${orderOrigin}/count?email=${email}`, {
        cache: "no-cache",
        headers: {
            authorization: `${process.env.API_KEY}`,
        },
    });
    const data: number = await res.json();
    return data;
};

export const getProductAvailableQuantity = async (productId: number) => {
    const res = await fetch(
        `${productAvailabilityOrigin}?product_id=${productId}`,
        {
            cache: "no-cache",
        }
    );
    const data: ProductAvailabilityType = await res.json();
    return data;
};

export const getProductReviewCount = async (product_id: number) => {
    const res = await fetch(`${reviewOrigin}/count?product_id=${product_id}`, {
        cache: "no-cache",
    });
    const data: { _count: number } = await res.json();
    return data._count;
};

export const getProductRatingAverage = async (product_id: number) => {
    const res = await fetch(
        `${reviewOrigin}/averagerating?product_id=${product_id}`,
        {
            cache: "no-cache",
        }
    );
    const data = await res.json();
    return data;
};

export const getTenProductReviewsByPage = async (
    product_id: number,
    page: number,
    signal: AbortSignal
) => {
    const res = await fetch(
        `${reviewOrigin}?product_id=${product_id}&page=${page}`,
        {
            cache: "no-cache",
            signal,
        }
    );
    const data: ProductReviewType[] = await res.json();
    return data;
};

export const getUserInfoByEmail = async (email: string) => {
    const res = await fetch(`${userOrigin}?email=${email}`, {
        // next: {
        //     revalidate: revalidateTime,
        // },
        // headers: {
        //     authorization: `${process.env.API_KEY}`,
        // },
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

export const getQuantitySold = async (productId: number) => {
    const res = await fetch(`${cartOrigin}/purchased?product_id=${productId}`, {
        cache: "no-cache",
    });
    const data: number = await res.json();
    return data;
};

// dashboard API calls !no cache
export const get24ProductsAdmin = async (page: number) => {
    const res = await fetch(`${productOrigin}?page=${page}`, {
        cache: "no-cache",
    });
    const data: ProductType[] = await res.json();
    return data;
};

export const getPriceByIdAdmin = async (id: number) => {
    const res = await fetch(`${priceOrigin}?price_id=${id}`, {
        cache: "no-cache",
    });
    const data: PriceType = await res.json();
    return data;
};

export const updateProductById = async (
    productId: number,
    body: Pick<
        ProductType,
        "category" | "active" | "name" | "description" | "default_price"
    >
) => {
    const res = await fetch(`${productOrigin}?product_id=${productId}`, {
        method: "put",
        body: JSON.stringify(body),
    });
    const data: string = await res.json();
    return data;
};

export const createPrice = async (
    body: Pick<PriceType, "unit_amount" | "product_id">
) => {
    const res = await fetch(priceOrigin, {
        method: "post",
        body: JSON.stringify(body),
    });
    const data: PriceType = await res.json();
    return data;
};

export const updatePriceById = async (priceId: number, unit_amount: number) => {
    const res = await fetch(`${priceOrigin}?price_id=${priceId}`, {
        method: "put",
        body: JSON.stringify({ unit_amount }),
    });
    const data = await res.json();
    return data;
};

export const getAllOrdersByPage = async (page: number) => {
    const res = await fetch(`${orderOrigin}?page=${page}`, {
        cache: "no-cache",
        headers: {
            authorization: `${process.env.API_KEY}`,
        },
    });
    const data: OrderType[] = await res.json();
    return data;
};

export const getAllOrdersCount = async () => {
    const res = await fetch(`${orderOrigin}/count`, {
        cache: "no-cache",
        headers: {
            authorization: `${process.env.API_KEY}`,
        },
    });
    const data: number = await res.json();
    return data;
};

export const getAllReviewsByPage = async (page: number) => {
    const res = await fetch(`${reviewOrigin}?page=${page}`, {
        cache: "no-cache",
    });
    const data: ProductReviewType[] = await res.json();
    return data;
};
export const getAllReviewsCount = async () => {
    const res = await fetch(`${reviewOrigin}/count`, {
        cache: "no-cache",
    });
    const data: { _count: number } = await res.json();
    return data._count;
};
