"use client";
import { CartType } from "../types";
import { deleteCartItemByProductId } from "../utils/apiCallsClient";
import { useRouter } from "next/navigation";

export function CartDeleteBtn(props: Pick<CartType, "product_id">) {
    const router = useRouter();

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        await deleteCartItemByProductId(props.product_id);
        router.refresh();
    };

    return (
        <form onSubmit={handleDelete}>
            <button
                type="submit"
                className=" bg-inherit border-none font-medium text-xs text-blue-700 hover:cursor-pointer hover:underline"
            >
                Delete
            </button>
        </form>
    );
}
