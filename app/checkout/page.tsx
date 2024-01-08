import { Checkout } from "../components/Checkout";
import { getCartByCookie } from "../utils/apiCalls";
import { cookies } from "next/headers";
import { CartType } from "../types";
import { CartProducts } from "../components/CartProducts";
import { FaLock } from "react-icons/fa";
import { createPaymentIntent } from "../utils/apiCalls";

export default async function CheckoutPage() {
    const cartData: CartType[] = await getCartByCookie(
        cookies().get("cookiecart")?.value
    );

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
        clientSecret = await createPaymentIntent(
            cookies().get("cookiecart")?.value,
            totalAmount
        );
    }

    return (
        <div>
            <div className="flex justify-around text-3xl">
                <span>
                    Checkout ({totalQ ? totalQ : 0}{" "}
                    {totalQ === 1 ? "item" : "items"})
                </span>
                <span>
                    <FaLock />
                </span>
            </div>
            <main>
                {/* <main className="lg:grid lg:grid-cols-[700px,_1fr]"> */}
                {totalAmount > 0 && (
                    <Checkout
                        totalAmount={totalAmount}
                        clientSecret={clientSecret}
                    />
                )}
                <br />
                <h2 className="stripe-h2">4. Review Items</h2>
                <div className=" bg-white">
                    {cartData.map((item, index) => (
                        <CartProducts key={index} {...item} />
                    ))}
                </div>
            </main>
            <br />
        </div>
    );
}
