export type ProductType = {
    product_id: string;
    created_at?: Date;
    default_price: string;
    description: string;
    images: string[];
    name: string;
    metadata: {
        category: "tops" | "dress";
    };
    quantity_available?: number;
    updated_at?: Date;
};

export type PriceType = {
    price_id: string;
    created_at: Date;
    unit_amount: number;
    updated_at: Date;
    product_id: string;
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
    price_id?: string;
    product_id: string;
    product_price?: number;
    purchased?: boolean;
};

export type HomeProductCardProps = {
    title1?: string;
    title2: string;
    description: string;
    link: string;
    linktext: string;
};

export type ModalProps = {
    modal: "t" | "f";
};

export type EmailProps = {
    name: string | undefined;
    email: string | undefined;
    message: string | undefined;
};

export type OrderProps = {
    order_id?: number;
    created_at?: Date;
    order_total: number;
    email: string;
    order_items: CartType[];
    payment_intent: string;
};
