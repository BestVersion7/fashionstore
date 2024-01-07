"use client";

import {
    CardElement,
    useElements,
    useStripe,
    AddressElement,
} from "@stripe/react-stripe-js";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import { CheckoutItem } from "./CheckoutItem";

import {
    createCustomer,
    createInvoice,
    getCartByCookie,
} from "../utils/apiCalls";
import { deleteCartCookie } from "../utils/apiCalls";
import { CartType } from "../types";

export function StripeForm() {
    const [cartItems, setCartItems] = useState<CartType[]>([]);
    const [total, setTotal] = useState(0);
    const [disablePay, setDisablePay] = useState(false);

    useEffect(() => {
        async function getCart() {
            const data: CartType[] = await getCartByCookie(
                getCookie("cookiecart")
            );
            setCartItems(data);

            const totalData = data
                .map((item) => (item.quantity * item.product_price) / 100)
                .reduce((arr, val) => arr + val);
            setTotal(totalData);
        }
        getCart();
    }, []);

    const stripe = useStripe();
    const elements = useElements();
    const emailRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

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
                const clientSecret = await createInvoice(customerId, cartItems);

                // verify the card works
                const { paymentIntent, error } =
                    await stripe?.confirmCardPayment(clientSecret, {
                        payment_method: { card: cardElement },
                    });

                // redirect if success
                if (!error) {
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
            <div className="grid grid-cols-2">
                <div>
                    <h2 className="stripe-h2">1. Enter your email.</h2>
                    <input
                        className=" w-auto border border-solid border-gray-300 shadow-sm rounded-md leading-8 pl-3"
                        type="text"
                        placeholder="Email"
                        ref={emailRef}
                    />{" "}
                    <br />
                    <h2 className="stripe-h2">2. Shipping Information</h2>
                    <AddressElement options={{ mode: "shipping" }} />
                    <br />
                    <h2 className="stripe-h2">3. Payment Method</h2>
                    4242424242424242
                    <CardElement /> <br />
                    <h2 className="stripe-h2">4. Review Items</h2>
                    {cartItems.map((item, index) => (
                        <CheckoutItem key={index} {...item} />
                    ))}
                </div>
                <div>
                    <p>Your total is ${total}</p>
                    <button
                        className="bg-orange-600 text-white text-xl p-3 shadow-md rounded-md hover:bg-green-400"
                        disabled={!stripe}
                        type="submit"
                    >
                        Pay
                    </button>
                </div>
            </div>
        </form>
    );
}
