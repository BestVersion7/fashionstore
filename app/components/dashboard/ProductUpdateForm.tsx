"use client";

import { ProductType } from "@/app/types";
import { productReducer } from "@/app/utils/dashboard";
import { useReducer } from "react";
import { updateProductById } from "@/app/utils/apiCalls";
import { notificationsArray } from "@/app/utils/notifications";
import { useRouter } from "next/navigation";
import Image from "next/image";

export const ProductUpdateForm = (props: {
    data: ProductType;
    setReload: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = await updateProductById(props.data.product_id, state);
        notificationsArray.push({ message: data });
        router.refresh();
        props.setReload((val) => !val);
    };

    const [state, dispatch] = useReducer(productReducer, props.data);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: "change_input",
            payload: { key: e.target.name, value: e.target.value },
        });
    };

    // name, description, default_price, active
    return (
        <form onSubmit={handleSubmit} className="grid border  border-black">
            <h3>ProductId: {props.data.product_id}</h3>
            <div className="h-36 relative">
                <Image
                    className="object-contain object-left"
                    fill
                    src={props.data.images[0]}
                    alt="d"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            <label>Name</label>
            <input
                value={props.data.name}
                name="name"
                onChange={handleChange}
                type="text"
                title="name"
            />
            <label>Category</label>
            <input
                defaultValue={props.data.category}
                name="category"
                onChange={handleChange}
                type="text"
                title="desc"
            />
            <label>Active</label>
            <input
                defaultValue={`${props.data.active}`}
                name="active"
                onChange={handleChange}
                title="active"
                type="text"
            />
            <button type="submit">Update</button>
        </form>
    );
};
