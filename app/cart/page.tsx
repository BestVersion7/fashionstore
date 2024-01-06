import Link from "next/link";
import { cookies } from "next/headers";
import { formatCurrency } from "../utils/formatCurrency";
import { getCartByCookie } from "../utils/apiCalls";
import { CartType } from "../types";
import { CartProducts } from "../components/CartProducts";

export default async function CartPage() {
    const cartItems: CartType[] = await getCartByCookie(
        cookies().get("cookiecart")?.value
    );

    const total = cartItems
        .map((item) => item.product_price * item.quantity)
        .reduce((arr, val) => arr + val, 0);

    return (
        <div>
            <Link href="/">Home</Link>
            <main>
                <div className="max-w-md">
                    <h3>Your cart: </h3>
                    {cartItems.length === 0 ? (
                        <span className="text-red-400">
                            You have no items in your cart
                        </span>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>Item Name:</th>
                                    <th>Item Description:</th>
                                    <th>Item Price</th>
                                    <th>Item Quantity</th>
                                    <th>Item Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item, index) => (
                                    <CartProducts key={index} {...item} />
                                ))}
                            </tbody>
                        </table>
                    )}
                    <div className="text-right">
                        <div className="border border-solid border-red-300 bg-red-50 pt-4">
                            Total: {formatCurrency(total)}
                        </div>
                    </div>

                    <div className="text-right mt-5">
                        <Link
                            className="text-right text-2xl no-underline p-2 border-2 border-solid rounded-xl border-red-400  bg-green-200 text-purple-800 hover:cursor-pointer hover:bg-yellow-200"
                            href="/checkout"
                        >
                            Checkout{" "}
                            <span className="text-green-800">{`>>`}</span>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
