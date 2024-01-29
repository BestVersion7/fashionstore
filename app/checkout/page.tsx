import { Checkout } from "../components/forms/Checkout";
import { getCartByCookie } from "../utils/apiCallsServer";
import { CartType } from "../types";
import { CartProducts } from "../components/cart/CartProducts";
import { FaLock } from "react-icons/fa";
import { createOrFindPaymentIntent } from "../utils/apiCallsServer";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Checkout",
    description: "No name, no brand, no premium clothing.",
};

export default async function CheckoutPage() {
    const cartData: CartType[] = await getCartByCookie();

    const totalQ =
        cartData.length > 0
            ? cartData
                  .map((item) => Number(item.quantity))
                  .reduce((arr, val) => arr + val)
            : 0;

    const totalAmount =
        cartData.length > 0
            ? cartData
                  .map(
                      (item) =>
                          Number(item.quantity) * Number(item.product_price)
                  )
                  .reduce((arr, val) => arr + val)
            : 0;

    let clientSecret;
    if (totalAmount > 0) {
        clientSecret = await createOrFindPaymentIntent(totalAmount);
    }

    return (
        <main>
            <div className="flex justify-around text-3xl py-3 font-semibold ">
                <span>
                    Checkout ({totalQ ? totalQ : 0}{" "}
                    {totalQ === 1 ? "item" : "items"})
                </span>
                <span>
                    <FaLock />
                </span>
            </div>
            <>
                {totalAmount > 0 && (
                    <Checkout
                        totalAmount={totalAmount}
                        clientSecret={`${clientSecret}`}
                        cartData={cartData}
                    />
                )}
                <br />
                <h2 className="stripe-h2">4. Review Items</h2>
                <div className=" bg-white">
                    {cartData.map((item, index) => (
                        <CartProducts key={index} {...item} />
                    ))}
                </div>
            </>
            <br />
        </main>
    );
}
