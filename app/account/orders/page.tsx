import { getOrdersByEmail } from "@/app/utils/apiCalls";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { OrderType } from "@/app/types";
import { CartProductsV2 } from "@/app/components/CartProductsV2";
import Link from "next/link";
import { formatCurrency } from "@/app/utils/formatCurrency";

export default async function OrdersPage() {
    const session = await getServerSession(authOptions);
    const orders: OrderType[] = await getOrdersByEmail(
        `${session?.user?.email}`
    );

    return (
        <main>
            <Link
                className="rounded-md bg-orange-300  px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-orange-400 hover:cursor-pointer"
                href="/account"
            >
                Back to Account
            </Link>

            <h2 className="mt-2 text-xl font-bold text-violet-700 tracking-wider">
                Past Orders:
            </h2>
            {orders.map((item) => (
                <div key={item.order_number}>
                    <h3>
                        Order Number:{" "}
                        <span className="font-bold">
                            V-{item.order_number.toString().padStart(5, "0")}
                        </span>
                    </h3>
                    <p>
                        Date:{" "}
                        <span className="font-bold">
                            {item.created_at.toString().split("T")[0]}
                        </span>
                    </p>
                    <p>
                        Total:{" "}
                        <span className="font-bold">
                            {formatCurrency(item.order_total)}
                        </span>
                    </p>
                    <div className="grid max-w-md gap-1">
                        <p>Purchased Items:</p>
                        {item.order_items.map((orderItem, index) => (
                            <CartProductsV2 key={index} {...orderItem} />
                        ))}
                    </div>
                </div>
            ))}
        </main>
    );
}
