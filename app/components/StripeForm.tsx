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
import { ConsumeCheckoutItem } from "./CheckoutItem";
import {
    createCustomer,
    createInvoice,
    getCartByCookie,
} from "../utils/serverAPICalls";
import { deleteCartCookie } from "../utils/clientAPICalls";
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
            setDisablePay(true);

            // creat the customer if all fields are filled
            const data1 = await addressElement?.getValue();
            if (data1?.complete) {
                // create the customer and it will return an id
                const customer = await createCustomer({
                    name: data1.value.name,
                    email: emailRef.current?.value,
                    shipping: data1.value,
                });

                const customerId = await customer.json();

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
            setDisablePay(false);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="grid grid-cols-2">
                <div>
                    <h3>1. Enter your email.</h3>
                    <input
                        className=" w-auto border border-solid border-gray-300 shadow-sm rounded-md leading-8 pl-3"
                        type="text"
                        placeholder="Email"
                        ref={emailRef}
                    />
                    <h3>2. Shipping Information</h3>
                    <AddressElement options={{ mode: "shipping" }} />
                    <h3>3. Payment Details</h3>
                    <CardElement />
                    <h3>4. Review Cart</h3>
                    {cartItems.map((item, index) => (
                        <ConsumeCheckoutItem key={index} {...item} />
                    ))}
                </div>
                <div>
                    <p>Your total is ${total}</p>
                    <button disabled={!stripe || disablePay} type="submit">
                        Pay
                    </button>
                </div>
            </div>
        </form>
    );
}
