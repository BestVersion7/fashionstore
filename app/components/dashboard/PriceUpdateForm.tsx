"use client";
import {
    getPriceByIdAdmin,
    updatePriceById,
    getPricesByProductId,
} from "@/app/utils/apiCalls";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { notificationsArray } from "@/app/utils/notifications";
import { PriceType } from "@/app/types";

export const PriceUpdateForm = (props: {
    product_id: number;
    price_id: number;
}) => {
    const [price, setPrice] = useState(0);
    const [prices, setPrices] = useState<PriceType[]>([]);
    const router = useRouter();

    const fetchPrice = async () => {
        const data = await getPriceByIdAdmin(props.price_id);
        setPrice(data.unit_amount);
        const getAllPrices = await getPricesByProductId(props.product_id);
        setPrices(getAllPrices);
    };

    useEffect(() => {
        fetchPrice();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = await updatePriceById(props.price_id, price);
        notificationsArray.push({ message: data });
        router.refresh();
    };

    return (
        <form onSubmit={handleSubmit} className="border border-red-400 grid">
            <section>
                {prices.map((item, index) => (
                    <p key={index}>
                        Price Id: {item.price_id} Amount: {item.unit_amount}
                    </p>
                ))}
            </section>
            <input
                title="price"
                type="number"
                name="unit_amount"
                value={price}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPrice(Number(e.target.value))
                }
            />
            <button className="submit-button" type="submit">
                Update Price
            </button>
        </form>
    );
};
