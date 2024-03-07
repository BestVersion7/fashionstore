import { Pagination } from "@/app/components/helpers/Pagination";
import { getAllReviewsByPage, getAllReviewsCount } from "@/app/utils/apiCalls";
import { ProductReviewComments } from "@/app/components/review/ProductReviewComments";

export default async function DashboardPage(props: {
    searchParams: { page: number };
}) {
    const page = props.searchParams.page || 1;
    const reviews = await getAllReviewsByPage(page);
    const count = await getAllReviewsCount();

    return (
        <main>
            <Pagination take={20} count={count} />
            <p>Count: {count} </p>
            <div className="grid grid-cols-2 gap-3">
                {reviews.map((item, index) => (
                    <div key={index}>
                        Product: {item.product_id}
                        <ProductReviewComments {...item} />
                    </div>
                ))}
            </div>
        </main>
    );
}
