import { CartType, CustomerType, EmailProps } from "../types";

let host = "http://localhost:3000";
if (process.env.NODE_ENV === "production") {
    host = "https://afashionstore.vercel.app";
}

const emailOrigin = `${host}/api/contact`;
const stripeOrigin = `${host}/api/stripe`;
const cartOrigin = `${host}/api/cart`;
const cartCookieOrigin = `${host}/api/cartcookie`;
const searchOrigin = `${host}/api/stripe/search`;

const revalidateTime = 60 * 60 * 24 * 1;

export const getAllProducts = async () => {
    const res = await fetch(`${stripeOrigin}/product`, {
        next: { revalidate: revalidateTime },
    });
    const { data } = await res.json();
    return data;
};

export const getProductById = async (id: string) => {
    const res = await fetch(`${stripeOrigin}/product?product_id=${id}`, {
        next: { revalidate: revalidateTime },
    });
    const data = await res.json();
    return data;
};

export const getPriceById = async (id: string) => {
    const res = await fetch(`${stripeOrigin}/price?price_id=${id}`, {
        next: { revalidate: revalidateTime },
    });
    const data = await res.json();
    return data;
};

export const getInvoiceById = async (id: string) => {
    const res = await fetch(`${stripeOrigin}/invoice?invoiceid=${id}`);
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
    cart: Pick<CartType, "price_id" | "quantity" | "purchased">
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
    const res = await fetch(`${stripeOrigin}/invoice`, {
        method: "post",
        body: JSON.stringify({ customerId: customer, cartItems: invoiceData }),
    });
    const data = await res.json();
    return data;
};

export const createPaymentIntent = async (
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
    const res = await fetch(`${searchOrigin}?product_name=${input}`);
    const { data } = await res.json();
    return data;
};

export const getProductBySearchCategory = async (input: string | undefined) => {
    const res = await fetch(`${searchOrigin}?product_category=${input}`);
    const { data } = await res.json();
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
