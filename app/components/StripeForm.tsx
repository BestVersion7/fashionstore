"use client";

import {
    CardElement,
    useElements,
    useStripe,
    AddressElement,
} from "@stripe/react-stripe-js";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

import {
    createCustomer,
    createInvoice,
    updateCartPurchased,
} from "../utils/apiCalls";
import { deleteCartCookie } from "../utils/apiCalls";
import { CartType } from "../types";
import { getCookie } from "cookies-next";

export function StripeForm(props: CartType[]) {
    const total = Object.values(props)
        .map((item) => (item.quantity * item.product_price) / 100)
        .reduce((arr, val) => arr + val);

    const [disablePay, setDisablePay] = useState(false);

    const stripe = useStripe();
    const elements = useElements();
    const emailRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    // const CardElement = elements?.create("cardNumber", {
    //     style: {
    //         base: {
    //             iconColor: "#c4f0ff",
    //             color: "#fff",
    //             fontWeight: "500",
    //             fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
    //             fontSize: "16px",
    //             fontSmoothing: "antialiased",
    //             ":-webkit-autofill": {
    //                 color: "#fce883",
    //             },
    //             "::placeholder": {
    //                 color: "#87BBFD",
    //             },
    //         },
    //         invalid: {
    //             iconColor: "#FFC7EE",
    //             color: "#FFC7EE",
    //         },
    //     },
    // });

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const cardElement = elements?.getElement("card");
        const addressElement = elements?.getElement("address");

        if (!stripe || !cardElement) return null;

        try {
            // setDisablePay(true);

            // creat the customer if all fields are filled
            const data1 = await addressElement?.getValue();
            if (data1?.complete) {
                // create the customer and it will return an id
                const customerId = await createCustomer({
                    name: data1.value.name,
                    email: emailRef.current?.value,
                    shipping: data1.value,
                });

                //create an invoice, add items, finalize invoice, get payment intent
                const clientSecret = await createInvoice(
                    customerId,
                    Object.values(props)
                );

                // verify the card works
                const { paymentIntent, error } =
                    await stripe?.confirmCardPayment(clientSecret, {
                        payment_method: { card: cardElement },
                    });

                // redirect if success
                if (!error) {
                    await updateCartPurchased(getCookie("cookiecart"), {
                        purchased: true,
                    });
                    await deleteCartCookie();
                    router.push(`/checkout/success/${paymentIntent.id}`);
                }
            }
            // setDisablePay(false);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="lg:grid lg:grid-cols-[800px,_1fr] xl:grid-cols-[950px,_1fr] lg:gap-5">
                <div>
                    <h2 className="stripe-h2">1. Enter your email</h2>
                    <input
                        className=" w-full border border-solid border-gray-300 shadow-sm rounded-md leading-8 pl-3"
                        type="text"
                        placeholder="Email"
                        ref={emailRef}
                    />
                    <br />
                    <br />
                    <h2 className="stripe-h2">2. Shipping Information</h2>
                    <AddressElement options={{ mode: "shipping" }} />
                    <br />
                    <h2 className="stripe-h2">3. Payment Method</h2>
                    4242424242424242
                    <CardElement /> <br />
                </div>

                {/* Order summary */}
                <div>
                    <br />
                    <div className="p-3 border border-white border-solid bg-white shadow-md rounded-md">
                        <h2 className="font-bold">Order Summary </h2> <br />
                        <div className="flex justify-between">
                            <span>Items:</span>
                            <span>${total}.00</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping & handling:</span>
                            <span className=" border-black">$0.00</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Total before tax:</span>
                            <span className=" border-black">${total}.00</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Estimated tax to be collected:</span>
                            <span className=" border-black">$0.00</span>
                        </div>
                        <hr className="h-[.1rem] bg-gray-300" />
                        <div className="flex justify-between text-red-700 text-xl font-semibold">
                            <span>Order total:</span>
                            <span className=" border-black">${total}.00</span>
                        </div>{" "}
                        <br />
                        <button
                            className=" z-10 w-full py-4 border border-gray-500 border-solid text-xl rounded-xl bg-yellow-300  hover:cursor-pointer hover:bg-yellow-400 lg:"
                            disabled={!stripe}
                            type="submit"
                        >
                            Place your order
                        </button>
                        <p className="text-center">
                            By placing your order, you agree to our privacy
                            notice and terms of use.
                        </p>
                    </div>
                </div>
            </div>
        </form>
    );
}
