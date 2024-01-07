export type ProductType = {
    id: string;
    default_price: string;
    description: string;
    images: string[];
    name: string;
};

export type InvoiceType = {
    customer_name: string;
    customer_email: string;
    lines: { data: { description: string; quantity: number }[] };
    amount_paid: number;
};

export type InvoiceCreationType = {
    customerId: string;
};

export type PriceType = {
    unit_amount: number;
    name: string;
    description: string;
    images: string[];
};

export type CustomerType = {
    name: string;
    email: string | undefined;
    shipping: {
        name: string;
        firstName?: string | undefined;
        lastName?: string | undefined;
        address: {
            line1: string;
            line2: string | null;
            city: string;
            state: string;
            postal_code: string;
            country: string;
        };
        phone?: string | undefined;
    };
};

export type CartType = {
    cart_id?: number;
    created_at?: Date;
    cookie_id?: string;
    quantity: number;
    price_id: string;
    product_id: string;
    product_price?: number;
    purchased: boolean;
};
