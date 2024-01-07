import Link from "next/link";
import { getCartTotal } from "../utils/apiCalls";
import { cookies } from "next/headers";

export async function CartTotal() {
    const totalQuantity = await getCartTotal(
        cookies().get("cookiecart")?.value
    );

    return (
        <Link className="no-underline  text-xl" href="/cart">
            Cart {totalQuantity > 0 ? `(${totalQuantity})` : ``}
        </Link>
    );
}
