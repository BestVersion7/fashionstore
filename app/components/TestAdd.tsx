"use client";
import { createCart } from "../utils/apiCallsClient";
import { useRouter } from "next/navigation";

export const TestAdd = () => {
    const allProds = [
        {
            product_id: "prod_PLbm7gDu5aik5k",
            price_id: "price_1OWuYyCUyZqMtN9sbdo8lmF5",
        },
        {
            product_id: "prod_PLQUrPnrePhfM3",
            price_id: "price_1OWjdCCUyZqMtN9sjvZKNJDG",
        },
        {
            product_id: "prod_PLQOsrPoV6Gvem",
            price_id: "price_1OWjY2CUyZqMtN9snAXoXDHv",
        },
        {
            product_id: "prod_PLQOJh4CY3MzqC",
            price_id: "price_1OWjXZCUyZqMtN9seFKxSuKX",
        },
        {
            product_id: "prod_PI7irC9woPF47p",
            price_id: "price_1OUzxhCUyZqMtN9sIA56e29N",
        },
        {
            product_id: "prod_PLQCvUcD3DkxaS",
            price_id: "price_1OWjMYCUyZqMtN9sljhcUyFi",
        },
        {
            product_id: "prod_PI7hdE135PujL7",
            price_id: "price_1OV01kCUyZqMtN9sPnVhX2Pg",
        },
        {
            product_id: "prod_PI4yezOWxk8uzz",
            price_id: "price_1OV02ACUyZqMtN9swYXSY0BT",
        },
    ];

    const router = useRouter();
    const handleAddCart = async () => {
        for (let i = 0; i < 7; i++) {
            await createCart({
                product_id: allProds[i].product_id,
                price_id: allProds[i].price_id,
                quantity: `${i + 1}`,
            });
        }

        router.refresh();
    };

    return (
        <button type="button" onClick={handleAddCart}>
            Mass Add
        </button>
    );
};
