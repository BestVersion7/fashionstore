import Link from "next/link";
import { getCartTotal } from "../utils/apiCalls";

export async function CartTotal() {
    const totalQuantity = await getCartTotal();

    return (
        <Link className="no-underline  text-xl" href="/cart">
            Cart {totalQuantity > 0 ? `(${totalQuantity})` : ``}
        </Link>
    );
}
