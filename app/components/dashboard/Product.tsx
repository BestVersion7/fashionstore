import { ProductType } from "../../types";
import {
    getPriceByIdAdmin,
    getProductAvailableQuantity,
} from "../../utils/apiCalls";
import { formatCurrency } from "../../utils/format";
import Image from "next/image";
import Link from "next/link";
import { shortenTitle } from "../../utils/format";

export const Product = async (props: ProductType) => {
    const { available_quantity } = await getProductAvailableQuantity(
        props.product_id
    );
    const { unit_amount } = await getPriceByIdAdmin(props.default_price);

    return (
        <div className="grid border p-3 bg-white border-black grid-rows-2">
            <div className="relative h-28">
                <Image
                    className="object-contain object-left"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    alt={props.name}
                    src={props.images[0]}
                    unoptimized
                />
            </div>

            <div className="grid grid-cols-[80px,_1fr] text-left">
                <span> Name:</span>
                <span>{shortenTitle(props.name)}</span>
                <span> SKU:</span>
                <span className="break-words overflow-hidden">
                    {props.product_id}
                </span>
                <span>Available:</span>
                <span>{available_quantity}</span>
                <span>Price:</span>
                <span> {formatCurrency(unit_amount)}</span>
                <Link
                    className="submit-button"
                    href={`/dashboard/products/${props.product_id}`}
                >
                    Edit
                </Link>
            </div>
        </div>
    );
};
