// import { getInvoiceById, getPaymentIntent } from "@/app/utils/apiCalls";
// import { formatCurrency } from "@/app/utils/formatCurrency";
// import { InvoiceType } from "@/app/types";
// import NotFound from "@/app/not-found";
// import Link from "next/link";

// export default async function SuccessPage({
//     params,
// }: {
//     params: { id: string };
// }) {
//     const invoiceId = await getPaymentIntent(params.id);

//     if (invoiceId.statusCode === 404) {
//         return <NotFound />;
//     }

//     const invoiceData: InvoiceType = await getInvoiceById(invoiceId.invoice);
//     const { customer_name, customer_email, lines, amount_paid } = invoiceData;

//     return (
//         <main>
//             <h2>
//                 Thank you for your purchase <mark>{customer_name}</mark>
//             </h2>
//             <p>
//                 A receipt email will be sent to your account{" "}
//                 <mark>{customer_email}</mark>. You can also create an account to
//                 see your past hisstory.
//             </p>
//             <section>
//                 <h3>Invoice Details:</h3>
//                 {lines.data.map((item, index) => (
//                     <div key={index}>
//                         Item: <mark>{item.description}</mark> quantity:{" "}
//                         <mark>{item.quantity}</mark>
//                     </div>
//                 ))}
//                 <p>
//                     Total: <mark>{formatCurrency(amount_paid)}</mark>{" "}
//                 </p>
//                 <Link href="/">Back to Home</Link>
//             </section>
//         </main>
//     );
// }
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
            <h2>Thank you for your purchase {data.shipping.name}.</h2>
            <p>A receipt will be sent to you at {data.receipt_email}</p>
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
