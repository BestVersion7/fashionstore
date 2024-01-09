import { getCartTotal } from "../utils/apiCalls";
import { cookies } from "next/headers";
import { LuShoppingCart } from "react-icons/lu";

export async function CartTotal() {
    const totalQuantity = await getCartTotal(
        cookies().get("cookiecart")?.value
    );
    let cartTotal = totalQuantity;

    if (typeof totalQuantity === "object") {
        cartTotal = 0;
    } else if (totalQuantity > 9) {
        cartTotal = `9+`;
    }

    return (
        <>
            <span className="absolute left-3 right-0 bottom-[1.1rem] z-10 text-orange-300 font-bold">
                {cartTotal > 0 && cartTotal}
            </span>
            <span className="text-3xl">
                <LuShoppingCart />
            </span>
        </>
    );
}
