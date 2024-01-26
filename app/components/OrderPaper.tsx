import { CartType, OrderType, PaymentIntentType } from "../types";
import {
    getPaymentIntent,
    getCartByCookie,
    getCartTotal,
} from "../utils/apiCalls";
import { formatCurrency } from "../utils/format";
import { CartProductsV2 } from "./CartProductsV2";

export const OrderPaper = async (props: OrderType) => {
    const shippingAddress: PaymentIntentType = await getPaymentIntent(
        props.payment_intent
    );

    const orderItems: CartType[] = await getCartByCookie(props.cookie_id);
    const totalQuantity = await getCartTotal(props.cookie_id);

    return (
        <article className="border-2 border-slate-600 py-2 px-3 bg-orange-50 w-[80vw] md:w-[600px]">
            <div className="md:flex md:justify-between">
                <div>
                    <h3>
                        Order Number:{" "}
                        <span className="font-bold">
                            V-
                            {props.order_number.toString().padStart(5, "0")}
                        </span>
                    </h3>
                    <p>
                        Purchase Date:{" "}
                        <span className="font-bold">
                            {props.created_at.toString().split("T")[0]}
                        </span>
                    </p>
                    <p>
                        Item Count:{" "}
                        <span className="font-bold">{totalQuantity}</span>
                    </p>

                    <p>
                        Total:{" "}
                        <span className="font-bold">
                            {formatCurrency(props.order_total)}
                        </span>
                    </p>
                </div>
                <div className="">
                    <div className="font-bold">
                        {shippingAddress.shipping.name} <br />
                        {shippingAddress.shipping.address.line1}{" "}
                        {shippingAddress.shipping.address.line2}
                        <br />
                        {shippingAddress.shipping.address.city},{" "}
                        {shippingAddress.shipping.address.state}{" "}
                        {shippingAddress.shipping.address.postal_code}
                    </div>
                </div>
            </div>
            <div className="grid gap-2">
                <p className="text-red-600 font-bold tracking-wide">
                    Purchased Items:
                </p>
                {orderItems.map((orderItem, index) => (
                    <CartProductsV2 key={index} {...orderItem} />
                ))}
            </div>
        </article>
    );
};
