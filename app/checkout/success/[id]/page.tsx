import { getInvoiceById, getPaymentIntent } from "@/app/utils/serverAPICalls";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { InvoiceType } from "@/app/types";

export default async function SuccessPage({
    params,
}: {
    params: { id: string };
}) {
    const invoiceId = await getPaymentIntent(params.id);
    const invoiceData: InvoiceType = await getInvoiceById(invoiceId);

    const { customer_name, customer_email, lines, amount_paid } = invoiceData;

    return (
        <div>
            <h2>
                Thank you for your purchase <mark>{customer_name}</mark>
            </h2>
            <p>
                A receipt email will be sent to your account{" "}
                <mark>{customer_email}</mark>. You can also create an account to
                see your past hisstory.
            </p>
            <section>
                <h3>Invoice Details:</h3>
                {lines.data.map((item, index) => (
                    <div key={index}>
                        Item: <mark>{item.description}</mark> quantity:{" "}
                        <mark>{item.quantity}</mark>
                    </div>
                ))}
                <p>
                    Total: <mark>{formatCurrency(amount_paid)}</mark>{" "}
                </p>
            </section>
        </div>
    );
}
