import { OrderPaper } from "@/app/components/account/OrderPaper";
import { Pagination } from "@/app/components/helpers/Pagination";
import { getAllOrdersByPage, getAllOrdersCount } from "@/app/utils/apiCalls";

export default async function DashboardPage(props: {
    searchParams: { page: number };
}) {
    const page = props.searchParams.page || 1;
    const orders = await getAllOrdersByPage(page);
    const count = await getAllOrdersCount();

    return (
        <main>
            <Pagination take={10} count={count} />
            <div className="grid grid-cols-2 gap-3">
                {orders.map((item, index) => (
                    <OrderPaper key={index} {...item} />
                ))}
            </div>
        </main>
    );
}
