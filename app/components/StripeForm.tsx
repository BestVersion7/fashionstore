"use client";

import {
    PaymentElement,
    useStripe,
    useElements,
    AddressElement,
} from "@stripe/react-stripe-js";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ImSpinner2 } from "react-icons/im";
import Link from "next/link";

import {
    getPaymentIntentFromCookie,
    updateCartPurchased,
} from "../utils/apiCallsClient";
import { getProductAvailableQuantity } from "../utils/apiCalls";
import {
    deleteCartCookie,
    updatePaymentIntent,
    updateProductAvailableQuantity,
    createOrder,
} from "../utils/apiCallsClient";
import { formatCurrency } from "../utils/format";
import { CartType } from "../types";
import { getCookie } from "cookies-next";

export function StripeForm(props: {
    totalAmount: number;
    cartData: CartType[];
}) {
    const orderItems = Object.values(
        props.cartData.map((item) => {
            return {
                product_id: item.product_id,
                product_price: item.product_price,
                quantity: item.quantity,
            };
        })
    );

    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | undefined>("");

    const stripe = useStripe();
    const elements = useElements();
    const emailRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) return null;

        try {
            setIsProcessing(() => true);

            // find the payment intent
            const paymentId = await getPaymentIntentFromCookie();

            // check quantity does not exceed
            const orderLength = orderItems.length;
            for (let i = 0; i < orderLength; i++) {
                const productAvailability = await getProductAvailableQuantity(
                    orderItems[i].product_id
                );
                if (
                    Number(orderItems[i].quantity) >
                    Number(productAvailability.available_quantity)
                ) {
                    setErrorMessage(
                        "An item in your cart exceeds availability."
                    );
                    setIsProcessing(() => false);
                    return;
                }
            }

            // update the total and email
            await updatePaymentIntent(paymentId, {
                email: emailRef.current?.value,
                amount: props.totalAmount,
            });

            const { error, paymentIntent } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${window.location.origin}/checkout/success`,
                },
                redirect: "if_required",
            });

            if (error) {
                console.log(error.message);
                setErrorMessage(error.message);
            } else if (paymentIntent && paymentIntent.status === "succeeded") {
                // create the order
                await createOrder({
                    cookie_id: getCookie("cookiecart") || "",
                    order_total: props.totalAmount,
                    payment_intent: paymentIntent.id,
                    email: emailRef.current?.value || "",
                });

                // change purchased to true in cart table
                // this is for getting the analytics by date sold
                await updateCartPurchased();

                // update  availability
                const orderLength = orderItems.length;
                for (let i = 0; i < orderLength; i++) {
                    await updateProductAvailableQuantity(
                        orderItems[i].product_id,
                        orderItems[i].quantity
                    );
                }

                await deleteCartCookie();

                router.push(`/checkout/success/${paymentIntent.id}`);

                // this is to clear the cart total
                router.refresh();
            } else {
                setErrorMessage("Please try again later.");
            }
            setIsProcessing(false);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <form onSubmit={onSubmit} name="checkout-form">
            <div className="lg:grid lg:grid-cols-[600px,_1fr] xl:grid-cols-[750px,_1fr] lg:gap-5">
                <div>
                    <div id="address"></div>
                    <h2 className="stripe-h2">1. Enter your email</h2>
                    <input
                        className=" w-full border border-solid border-gray-300 shadow-sm rounded-md leading-8 pl-4 py-[7px] placeholder:text-slate-600 focus:outline-none focus:shadow-[0_0_0_3px]"
                        type="email"
                        placeholder="email@example.com"
                        ref={emailRef}
                        name="email"
                        autoComplete="on"
                        required
                    />
                    <br />
                    <br />
                    <h2 className="stripe-h2">2. Shipping Information</h2>
                    <AddressElement options={{ mode: "shipping" }} />
                    <br />
                    <h2 className="stripe-h2">3. Payment Method</h2>
                    4242424242424242
                    <div id="payment-element" />
                    <PaymentElement />
                </div>

                {/* Order summary */}
                <div>
                    <br />
                    <div className="p-3 border border-white border-solid bg-white shadow-md rounded-md">
                        <h2 className="font-bold">Order Summary </h2> <br />
                        <div className="flex justify-between">
                            <span>Items:</span>
                            <span>{formatCurrency(props.totalAmount)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping & handling:</span>
                            <span className=" border-black">$0.00</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Total before tax:</span>
                            <span className=" border-black">
                                {formatCurrency(props.totalAmount)}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span>Estimated tax to be collected:</span>
                            <span className=" border-black">$0.00</span>
                        </div>
                        <hr className="h-[.1rem] bg-gray-300" />
                        <div className="flex justify-between text-red-700 text-xl font-semibold">
                            <span>Order total:</span>
                            <span className=" border-black">
                                {formatCurrency(props.totalAmount)}
                            </span>
                        </div>{" "}
                        <br />
                        <button
                            className=" z-10 w-full py-4 border border-gray-500 border-solid text-xl rounded-xl bg-yellow-300  hover:bg-yellow-400 lg:"
                            disabled={isProcessing}
                            type="submit"
                        >
                            Place your order
                        </button>
                        {isProcessing && <ImSpinner2 />}
                        {errorMessage && (
                            <span className="text-red-500">{errorMessage}</span>
                        )}
                        <p className="text-center">
                            By placing your order, you agree to our{" "}
                            <Link className="underline" href="/privacy">
                                privacy
                            </Link>{" "}
                            notice and terms of use.
                        </p>
                    </div>
                </div>
            </div>
        </form>
    );
}
