import {
    getOrderByPaymentIntent,
    getPaymentIntent,
} from "@/app/utils/apiCalls";
import Link from "next/link";
import { OrderPaper } from "@/app/components/account/OrderPaper";

export default async function SuccessPage({
    params,
}: {
    params: { id: string };
}) {
    const paymentIntentData = await getPaymentIntent(params.id);
    const orderData = await getOrderByPaymentIntent(params.id);
    return (
        <main>
            <p className="text-xl font-bold">
                Thank you for your purchase {paymentIntentData.shipping.name}!
            </p>
            <p>
                A receipt will be sent to{" "}
                <span className=" bg-yellow-200 px-1">
                    {paymentIntentData.receipt_email}
                </span>
            </p>

            <div className="flex flex-col items-start">
                <OrderPaper {...orderData} />
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
