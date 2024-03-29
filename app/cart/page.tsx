import Link from "next/link";
import { formatCurrency } from "../utils/format";
import { getCartByCookie } from "../utils/apiCallsServer";
import { CartProducts } from "../components/cart/CartProducts";
import { Metadata } from "next";
// import { TestAdd } from "../components/TestAdd";

export const metadata: Metadata = {
    title: "Cart",
    description: "No name, no brand, no premium clothing.",
};

export default async function CartPage() {
    const cartItems = await getCartByCookie();

    const total = cartItems
        .map((item) => Number(item.product_price) * Number(item.quantity))
        .reduce((arr, val) => arr + val, 0);
    const totalQ = cartItems
        .map((item) => Number(item.quantity))
        .reduce((arr, val) => arr + val, 0);

    return (
        <main>
            <Link href="/shop" className="underline text-orange-600">
                Go back
            </Link>

            <div>
                <div className="lg:gap-7 lg:grid lg:grid-cols-[780px,_1fr] xl:grid-cols-[850px,_1fr] 2xl:grid-cols-[900px,_1fr]">
                    {cartItems.length === 0 ? (
                        <span className="text-red-400">
                            You have no items in your cart
                        </span>
                    ) : (
                        <div className="bg-white shadow-md rounded-l">
                            <div className="flex justify-between mx-5 my-3">
                                <h2 className="text-3xl">Shopping Cart: </h2>
                                <h3 className="hidden lg:block">Price</h3>
                            </div>
                            <hr className="h-[.1rem] bg-gray-300" />

                            {cartItems.map((item, index) => (
                                <CartProducts key={index} {...item} />
                            ))}
                        </div>
                    )}
                    <div className="text-center px-2 py-2 bg-white shadow-md lg:h-52">
                        <p className="italic text-sm text-green-600 ">
                            All orders greater than $50.00 qualify for free
                            shipping.
                        </p>
                        <p>
                            Subtotal ({totalQ} items):{" "}
                            <span className="font-semibold">
                                {formatCurrency(total)}
                            </span>
                        </p>{" "}
                        <br />
                        <Link
                            className="py-2 px-3 rounded-xl w-52 bg-yellow-300  hover:cursor-pointer hover:bg-yellow-400"
                            type="button"
                            href="/checkout"
                        >
                            Proceed to checkout{" "}
                        </Link>
                    </div>
                </div>
            </div>
            <br />
        </main>
    );
}
