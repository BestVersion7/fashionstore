export type ProductType = {
    product_id: string;
    created_at: string;
    default_price: string;
    description: string;
    images: string[];
    name: string;
    category: "tops" | "dress";
    updated_at: string;
};

export type PriceType = {
    price_id: string;
    created_at: string;
    unit_amount: string;
    updated_at: string;
    product_id: string;
};

export type PaymentIntentType = {
    id: string;
    amount: string;
    receipt_email: string;
    shipping: {
        address: {
            line1: string;
            line2: string | null;
            city: string;
            state: string;
            postal_code: string;
            country: string;
            phone: string;
        };
        name: string;
    };
};

export type CartType = {
    cart_id: number;
    created_at: string;
    cookie_id: string;
    quantity: string;
    price_id: string;
    product_id: string;
    product_price: string;
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

export type OrderType = {
    order_number: string;
    created_at: string;
    order_total: string;
    email: string;
    payment_intent: string;
    cookie_id: string;
};

export type ProductAvailabilityType = {
    product_id: string;
    available_quantity: string;
    quantity_sold: number;
};

export type ProductReviewType = {
    review_id: string;
    created_at: string;
    user_email: string;
    review_message: string | null;
    product_id: string;
    review_star: number;
};

export type UserType = {
    name: string;
    email: string;
    image: string;
};
