import {
    getOrderByPaymentIntent,
    getPaymentIntent,
} from "@/app/utils/apiCalls";
import { formatCurrency } from "@/app/utils/formatCurrency";
import Link from "next/link";
import { PaymentIntentType, OrderType } from "@/app/types";
import { CartProductsV2 } from "@/app/components/CartProductsV2";

export default async function SuccessPage({
    params,
}: {
    params: { id: string };
}) {
    const paymentIntentData: PaymentIntentType = await getPaymentIntent(
        params.id
    );
    const orderData: OrderType = await getOrderByPaymentIntent(params.id);
    console.log(orderData);

    return (
        <main>
            <p className="text-2xl font-medium">
                Thank you for your purchase {paymentIntentData.shipping.name}.
            </p>
            <p>A receipt will be sent to you.</p>
            <p>
                Order Number:{" "}
                <span className="font-bold">
                    V-{orderData.order_number.toString().padStart(5, "0")}
                </span>
            </p>
            <p>
                Email:{" "}
                <span className="font-bold">
                    {paymentIntentData.receipt_email}
                </span>
            </p>
            <p>
                Total:{" "}
                <span className="font-bold">
                    {formatCurrency(paymentIntentData.amount)}
                </span>
            </p>
            <p>Shipping address:</p>
            <p>
                {paymentIntentData.shipping.address.line1}{" "}
                {paymentIntentData.shipping.address.line2}
            </p>
            <p>
                {paymentIntentData.shipping.address.city},{" "}
                {paymentIntentData.shipping.address.state}{" "}
                {paymentIntentData.shipping.address.postal_code}
            </p>

            <br />
            <h3 className="italic font-medium text-violet-700">
                Products Ordered:{" "}
            </h3>

            <div className="grid md:grid-cols-2 gap-1">
                {orderData.order_items.map((items, index) => (
                    <CartProductsV2 key={index} {...items} />
                ))}
            </div>
            <br />
            <Link
                className="rounded-md bg-orange-300 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-orange-400 hover:cursor-pointer"
                href="/"
            >
                Back to Home
            </Link>
        </main>
    );
}
