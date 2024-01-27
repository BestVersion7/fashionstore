import { getCartTotal } from "../utils/apiCallsServer";
import { LuShoppingCart } from "react-icons/lu";

export async function CartTotal() {
    const totalQuantity = await getCartTotal();
    let cartTotal = totalQuantity;

    if (typeof totalQuantity === "object") {
        cartTotal = 0;
    }
    // else if (totalQuantity > 9) {
    //     cartTotal = totalQuantity;
    // }

    return (
        <div className="relative text-center">
            <span className="text-2xl">
                <LuShoppingCart />
            </span>
            <span className="absolute text-sm right-0 left-0 bottom-[1.0rem] text-orange-300 font-bold">
                {cartTotal > 0 && cartTotal}
            </span>
        </div>
    );
}
