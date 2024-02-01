"use client";

import { ProductType } from "@/app/types";
import { productReducer } from "@/app/utils/dashboard";
import { useReducer } from "react";
import { updateProductById } from "@/app/utils/apiCalls";
import { notificationsArray } from "@/app/utils/notifications";
import { useRouter } from "next/navigation";
import Image from "next/image";

export const ProductForm = (props: ProductType) => {
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = await updateProductById(props.product_id, state);
        notificationsArray.push({ message: data });
        router.refresh();
    };

    const [state, dispatch] = useReducer(productReducer, props);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: "change_input",
            payload: { key: e.target.name, value: e.target.value },
        });
    };

    // name, description, default_price, active
    return (
        <form onSubmit={handleSubmit} className="grid border  border-black">
            <h3>ProductId: {props.product_id}</h3>
            <div className="h-36 relative">
                <Image
                    className="object-contain object-left"
                    fill
                    src={props.images[0]}
                    alt="d"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            <label>Name</label>
            <input
                defaultValue={props.name}
                name="name"
                onChange={handleChange}
                type="text"
                title="name"
            />
            <label>Category</label>
            <input
                defaultValue={props.category}
                name="category"
                onChange={handleChange}
                type="text"
                title="desc"
            />
            <label>Active</label>
            <input
                defaultValue={`${props.active}`}
                name="active"
                onChange={handleChange}
                title="active"
                type="text"
            />
            <div>priceId {props.default_price}</div>
            <button type="submit">Submit</button>
        </form>
    );
};
