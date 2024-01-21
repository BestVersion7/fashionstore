import { getOrdersByEmail } from "@/app/utils/apiCalls";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { OrderType } from "@/app/types";
import { CartProductsV2 } from "@/app/components/CartProductsV2";
import Link from "next/link";
import { formatCurrency } from "@/app/utils/formatCurrency";
import { OrderPaper } from "@/app/components/OrderPaper";

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

            <h2 className="mt-2 text-center text-2xl font-bold text-violet-700 tracking-wider">
                Past Orders ({orders.length}):
            </h2>
            {orders.length < 1 ? (
                <p className="text-center">You have no past orders.</p>
            ) : (
                <div className="flex flex-col items-center gap-3  ">
                    {orders.map((item) => (
                        <OrderPaper key={item.order_number} {...item} />
                    ))}
                </div>
            )}
        </main>
    );
}
