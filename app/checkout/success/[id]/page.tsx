import { getPaymentIntent } from "@/app/utils/apiCalls";
import { formatCurrency } from "@/app/utils/formatCurrency";
import Link from "next/link";
export default async function SuccessPage({
    params,
}: {
    params: { id: string };
}) {
    const data = await getPaymentIntent(params.id);

    return (
        <main>
            <p className="text-2xl font-medium">
                Thank you for your purchase {data.shipping.name}.
            </p>
            <p>
                Order ID: <mark>{params.id}</mark>
            </p>
            <p>A receipt will be sent to you.</p>
            <p>
                Email: <mark>{data.receipt_email}</mark>
            </p>
            <p>Shipping address:</p>
            <p>
                {data.shipping.address.line1} {data.shipping.address.line2}
            </p>
            <p>
                {data.shipping.address.city}, {data.shipping.address.state}{" "}
                {data.shipping.postal_code}
            </p>
            <p>
                Total: <mark>{formatCurrency(data.amount)}</mark>
            </p>
            <Link href="/">Back to Home</Link>
        </main>
    );
}
