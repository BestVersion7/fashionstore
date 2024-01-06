import { useEffect, useState } from "react";
import { CartProps } from "./CartQChange";
import { getProductById } from "../utils/serverAPICalls";

export function ConsumeCheckoutItem(props: CartProps) {
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
