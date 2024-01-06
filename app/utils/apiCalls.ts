import { CartType, CustomerType } from "../types";

const options = {
    headers: {
        authorization: `${process.env.API_KEY}`,
    },
};

const stripeOrigin = "/api/stripe";
const cartOrigin = "/api/cart";
const cartCookieOrigin = "/api/cartcookie";

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

export const getInvoiceById = async (id: string) => {
    const res = await fetch(`${stripeOrigin}/invoice?invoiceid=${id}`, options);
    const data = await res.json();
    return data;
};

export const getCartTotal = async () => {
    const res = await fetch(`${cartOrigin}/total`, {
        ...options,
        cache: "no-cache",
    });
    const data = await res.json();
    return data;
};

export const getCartByCookie = async () => {
    const res = await fetch(cartOrigin, {
        ...options,
        cache: "no-cache",
    });
    const data = await res.json();
    return data;
};

export const createCartCookie = async () => {
    const res = await fetch(cartCookieOrigin, { ...options, method: "post" });
    const data = await res.json();
    return data;
};

export const deleteCartCookie = async () => {
    const res = await fetch(cartCookieOrigin, { ...options, method: "delete" });
    const data = await res.json();
    return data;
};

export const createCart = async (cart: CartType) => {
    const res = await fetch(cartOrigin, {
        ...options,
        method: "POST",
        body: JSON.stringify(cart),
    });
    const data = await res.json();
    return data;
};

export const updateCart = async (
    cart: Pick<CartType, "price_id" | "quantity">
) => {
    const res = await fetch(cartOrigin, {
        ...options,
        method: "PUT",
        body: JSON.stringify(cart),
    });
    const data = await res.json();
    return data;
};

export const deleteCartItemByPriceId = async (priceId: string) => {
    const res = await fetch(cartOrigin, {
        ...options,
        method: "DELETE",
        body: JSON.stringify({ price_id: priceId }),
    });
    const data = await res.json();
    return data;
};

export const getPaymentIntent = async (id: string) => {
    const res = await fetch(`${stripeOrigin}?id=${id}`, { ...options });
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

export const createInvoice = async (
    customer: string,
    invoiceData: CartType[]
) => {
    const res = await fetch(`${stripeOrigin}`, {
        ...options,
        method: "post",
        body: JSON.stringify({ customerId: customer, invoiceData }),
    });
    const data = await res.json();
    return data;
};
