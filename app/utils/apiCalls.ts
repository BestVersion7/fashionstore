const stripeOrigin = "https://www.hunterkf.com/api/v2/stripe";
const cartOriginServer = "https://www.hunterkf.com/api/v2/cart";

const options = {
    headers: {
        authorization: `${process.env.API_KEY}`,
    },
};

export const getAllProducts = async () => {
    const res = await fetch(`${stripeOrigin}/product`, {
        ...options,
        // next: { revalidate: 60 * 60 * 24 * 1 },
        cache: "no-store",
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
