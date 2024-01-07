import { useEffect, useState } from "react";
import { getProductById } from "../utils/apiCalls";
import { CartType } from "../types";
import { formatCurrency } from "../utils/formatCurrency";

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
                <i>{itemName}</i> Quantity:
                {props.quantity}{" "}
                <mark>
                    {formatCurrency(props.quantity * props.product_price)}
                </mark>
            </p>
        </div>
    );
}
