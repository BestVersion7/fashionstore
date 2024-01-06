import { useEffect, useState } from "react";
import { getProductById } from "../utils/apiCalls";
import { CartType } from "../types";

export function CheckoutItem(props: CartType) {
    const [itemName, setItemName] = useState();

    async function getPrice() {
        const data = await getProductById(props.product_id);
        setItemName(data.name);
    }

    useEffect(() => {
        getPrice();
    }, []);

    return (
        <div>
            <p>
                <i>{itemName}</i> Quantity:<mark>{props.quantity}</mark>
            </p>
        </div>
    );
}
