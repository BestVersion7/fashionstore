import { PriceUpdateForm } from "@/app/components/dashboard/PriceUpdateForm";
import { ProductUpdateForm } from "@/app/components/dashboard/ProductUpdateForm";
import { QuantityUpdateForm } from "@/app/components/dashboard/QuantityUpdateForm";
import { getProductByIdAdmin } from "@/app/utils/apiCalls";
import Link from "next/link";

export default async function ProductIdPage(props: {
    params: { product_id: string };
}) {
    const id = Number(props.params.product_id);
    const product = await getProductByIdAdmin(id);

    return (
        <main>
            <Link
                href={`/dashboard/products/${id + 1}`}
                className="link-button"
            >
                Prev
            </Link>
            <Link
                href={`/dashboard/products/${id - 1}`}
                className="link-button"
            >
                Next
            </Link>
            <ProductUpdateForm {...product} />
            <PriceUpdateForm
                product_id={product.product_id}
                price_id={product.default_price}
            />
            <QuantityUpdateForm product_id={product.product_id} />
        </main>
    );
}
