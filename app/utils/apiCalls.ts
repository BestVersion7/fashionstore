import { CartType, CustomerType } from "../types";

// const options = {
//     headers: {
//         authorization: `${process.env.API_KEY}`,
//     },
// };

let host = "http://localhost:3000";

const stripeOrigin = `${host}/api/stripe`;
const cartOrigin = `${host}/api/cart`;
const cartCookieOrigin = `${host}/api/cartcookie`;

export const getAllProducts = async () => {
    const res = await fetch(`${stripeOrigin}/product`, {
        next: { revalidate: 60 * 60 * 24 * 1 },
    });
    const { data } = await res.json();
    return data;
};

export const getProductById = async (id: string) => {
    const res = await fetch(`${stripeOrigin}/product?product_id=${id}`, {
        next: { revalidate: 60 * 60 * 24 * 7 },
    });
    const data = await res.json();
    return data;
};

export const getPriceById = async (id: string) => {
    const res = await fetch(`${stripeOrigin}/price?price_id=${id}`, {
        next: { revalidate: 60 * 60 * 24 * 7 },
    });
    const data = await res.json();
    return data;
};

export const getInvoiceById = async (id: string) => {
    const res = await fetch(`${stripeOrigin}/invoice?invoiceid=${id}`);
    const data = await res.json();
    return data;
};

export const getCartTotal = async () => {
    const res = await fetch(`${cartOrigin}/total`, {
        cache: "no-cache",
    });
    const data = await res.json();
    return data;
};

export const getCartByCookie = async () => {
    const res = await fetch(cartOrigin, {
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
    cart: CartType
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
    cart: Pick<CartType, "price_id" | "quantity">
) => {
    const res = await fetch(`${cartOrigin}?cookie_id=${cookieId}`, {
        method: "PUT",
        body: JSON.stringify(cart),
    });
    const data = await res.json();
    return data;
};

export const deleteCartItemByPriceId = async (
    cookieId: string | undefined,
    priceId: string
) => {
    const res = await fetch(`${cartOrigin}?cookie_id=${cookieId}`, {
        method: "DELETE",
        body: JSON.stringify({ price_id: priceId }),
    });
    const data = await res.json();
    return data;
};

export const getPaymentIntent = async (id: string) => {
    const res = await fetch(`${stripeOrigin}?id=${id}`);
    const data = await res.json();
    return data;
};

export const createCustomer = async (customerData: CustomerType) => {
    const res = await fetch(`${stripeOrigin}/customer`, {
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
        method: "post",
        body: JSON.stringify({ customerId: customer, invoiceData }),
    });
    const data = await res.json();
    return data;
};
