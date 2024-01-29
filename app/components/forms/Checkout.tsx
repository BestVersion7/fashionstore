"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { StripeForm } from "@/app/components/forms/StripeForm";
import { CartType } from "../../types";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
    "pk_test_51OTUUVCUyZqMtN9snCdnOmnu3KjiiuTz6num1fgxo6bn19YBukBqDlnujBZ6SAzCsH12EQfpJO1X7HN2gsEZoDeJ00fyrpyU9K"
);

export type CheckoutProps = {
    totalAmount: number;
    clientSecret: string;
    cartData: CartType[];
};

export function Checkout(props: CheckoutProps) {
    return (
        <Elements
            stripe={stripePromise}
            options={{ clientSecret: props.clientSecret }}
        >
            <StripeForm
                totalAmount={props.totalAmount}
                cartData={props.cartData}
            />
        </Elements>
    );
}
