import { get24ProductsAdmin, getCountProduct } from "@/app/utils/apiCalls";
import { Pagination } from "@/app/components/helpers/Pagination";
import { Product } from "@/app/components/dashboard/Product";

export default async function ProductsPage(props: {
    searchParams: { page: number };
}) {
    const page = props.searchParams.page || 1;
    const productData = await get24ProductsAdmin(Number(page));
    const countData = await getCountProduct();

    return (
        <main>
            <Pagination count={countData} take={24} />
            <p>Count: {countData} </p>
            <div className="grid grid-cols-2 gap-3 ">
                {productData.map((item, index) => (
                    <Product key={index} {...item} />
                ))}
            </div>
        </main>
    );
}
