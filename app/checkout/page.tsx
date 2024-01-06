"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { StripeForm } from "@/app/components/StripeForm";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
    "pk_test_51OTUUVCUyZqMtN9snCdnOmnu3KjiiuTz6num1fgxo6bn19YBukBqDlnujBZ6SAzCsH12EQfpJO1X7HN2gsEZoDeJ00fyrpyU9K"
);

export default function Checkout() {
    return (
        <Elements stripe={stripePromise}>
            <StripeForm />
        </Elements>
    );
}
