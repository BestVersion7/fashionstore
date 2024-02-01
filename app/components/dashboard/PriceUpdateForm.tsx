"use client";
import { getPriceByIdAdmin, updatePriceById } from "@/app/utils/apiCalls";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { notificationsArray } from "@/app/utils/notifications";

export const PriceUpdateForm = (props: {
    price_id: number;
    setReload: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const [price, setPrice] = useState(0);
    const router = useRouter();

    const getPrice = async () => {
        const data = await getPriceByIdAdmin(props.price_id);
        setPrice(data.unit_amount);
    };

    useEffect(() => {
        getPrice();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = await updatePriceById(props.price_id, price);
        notificationsArray.push({ message: data });
        router.refresh();
        props.setReload((val) => !val);
    };

    return (
        <form onSubmit={handleSubmit} className="border border-red-400 grid">
            <label>Price Id: {props.price_id}</label>
            <input
                title="price"
                type="number"
                name="unit_amount"
                value={price}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPrice(Number(e.target.value))
                }
            />
            <button type="submit">Update</button>
        </form>
    );
};
