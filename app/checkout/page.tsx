import { Checkout } from "../components/Checkout";
import { getCartByCookie } from "../utils/apiCalls";
import { cookies } from "next/headers";
import { CartType } from "../types";
import { CartProducts } from "../components/CartProducts";

export default async function CheckoutPage() {
    const cartData: CartType[] = await getCartByCookie(
        cookies().get("cookiecart")?.value
    );

    return (
        <main>
            <div className="flex justify-around text-3xl">
                <span>Checkout (1 item)</span>
                <span>Lock</span>
            </div>
            {/* <main className="lg:grid lg:grid-cols-[700px,_1fr]"> */}
            <Checkout {...cartData} />
            <br />
            <h2 className="stripe-h2">4. Review Items</h2>
            <div className=" bg-white">
                {cartData.map((item, index) => (
                    <CartProducts key={index} {...item} />
                ))}
            </div>
            <br />
        </main>
    );
}
