"use client";
import {
    getProductAvailableQuantity,
    updatePriceById,
} from "@/app/utils/apiCalls";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { notificationsArray } from "@/app/utils/notifications";

export const QuantityUpdateForm = (props: {
    product_id: number;
    setReload: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const [quantity, setQuantity] = useState(0);
    const router = useRouter();

    const getQuantity = async () => {
        const data = await getProductAvailableQuantity(props.product_id);
        setQuantity(data.available_quantity);
    };

    useEffect(() => {
        getQuantity();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // notificationsArray.push({ message: data });
        router.refresh();
        props.setReload((val) => !val);
    };

    return (
        <form onSubmit={handleSubmit} className="border border-red-400 grid">
            <label>Available Quantity: {quantity}</label>
            <input
                title="quantity"
                type="number"
                name="quantity"
                value={quantity}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setQuantity(Number(e.target.value))
                }
            />
            <button type="submit">Update</button>
        </form>
    );
};
