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
        <div>
            <Checkout {...cartData} />
            {cartData.map((item, index) => (
                <CartProducts key={index} {...item} />
            ))}
        </div>
    );
}
