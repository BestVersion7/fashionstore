import { getOrdersByEmail, getOrderCountByEmail } from "@/app/utils/apiCalls";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { OrderType } from "@/app/types";
import Link from "next/link";
import { OrderPaper } from "@/app/components/account/OrderPaper";
import { Pagination } from "@/app/components/helpers/Pagination";

export const metadata = {
    title: "Orders",
    description: "Orders for Afashionstore",
};

export default async function OrdersPage(props: {
    searchParams: { page: number };
}) {
    const page = props.searchParams.page || 1;
    const session = await getServerSession(authOptions);
    const count = await getOrderCountByEmail(`${session?.user?.email}`);
    const orders: OrderType[] = await getOrdersByEmail(
        `${session?.user?.email}`,
        page
    );

    return (
        <main>
            <Link
                className="rounded-md bg-orange-300  px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-orange-400 hover:cursor-pointer"
                href="/account"
            >
                Back to Account
            </Link>

            <Pagination count={count} take={2} />
            <h2 className="mt-2 text-center text-2xl font-bold text-violet-700 tracking-wider">
                Past Orders ({count}):
            </h2>
            {count < 1 ? (
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
