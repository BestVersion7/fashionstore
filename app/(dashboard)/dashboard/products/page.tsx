import { get24ProductsAdmin, getCountProduct } from "@/app/utils/apiCalls";
import { Pagination } from "@/app/components/helpers/Pagination";
import Link from "next/link";
import Image from "next/image";

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
                    <div key={index}>
                        <Link href={`/dashboard/products/${item.product_id}`}>
                            Product Id: {item.product_id}
                            <div className="h-36 relative">
                                <Image
                                    className="object-contain object-left"
                                    fill
                                    src={item.images[0]}
                                    alt="d"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </main>
    );
}
