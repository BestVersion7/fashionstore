import { CartType, CustomerType } from "../types";

const stripeOrigin = "https://www.hunterkf.com/api/v2/stripe";
const cartOriginServer = "https://www.hunterkf.com/api/v2/cart";

let cartOrigin = "/api/cart";

const options = {
    headers: {
        authorization: `${process.env.API_KEY}`,
    },
};

export const getAllProducts = async () => {
    const res = await fetch(`${stripeOrigin}/product`, {
        ...options,
        next: { revalidate: 60 * 60 * 24 * 1 },
    });
    const { data } = await res.json();
    return data;
};

export const getProductById = async (id: string) => {
    const res = await fetch(`${stripeOrigin}/product?product_id=${id}`, {
        ...options,
        next: { revalidate: 60 * 60 * 24 * 7 },
    });
    const data = await res.json();
    return data;
};

export const getPriceById = async (id: string) => {
    const res = await fetch(`${stripeOrigin}/price?price_id=${id}`, {
        ...options,
        next: { revalidate: 60 * 60 * 24 * 7 },
    });
    const data = await res.json();
    return data;
};

export const getPaymentIntent = async (id: string) => {
    const res = await fetch(`${stripeOrigin}/paymentintent?id=${id}`, options);
    const data = await res.json();
    return data;
};

export const createCustomer = async (customerData: CustomerType) => {
    const res = await fetch(`${stripeOrigin}/customer`, {
        ...options,
        method: "post",
        body: JSON.stringify(customerData),
    });
    const data = await res.json();
    return data;
};

export const getInvoiceById = async (id: string) => {
    const res = await fetch(`${stripeOrigin}/invoice?invoiceid=${id}`, options);
    const data = await res.json();
    return data;
};

export const createInvoice = async (
    customer: string,
    invoiceData: CartType[]
) => {
    const res = await fetch(`${stripeOrigin}/invoice`, {
        ...options,
        method: "post",
        body: JSON.stringify({ customerId: customer, invoiceData }),
    });
    const data = await res.json();
    return data;
};

export const getCartTotal = async (cookie: string | undefined) => {
    const res = await fetch(`${cartOriginServer}/total?cookie_id=${cookie}`, {
        ...options,
        cache: "no-cache",
    });
    const data = await res.json();
    return data;
};

export const getCartByCookie = async (cookie: string | undefined) => {
    const res = await fetch(`${cartOriginServer}?cookie_id=${cookie}`, {
        ...options,
        cache: "no-cache",
    });
    const data = await res.json();
    return data;
};

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
