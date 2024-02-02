"use client";

import { ProductUpdateForm } from "@/app/components/dashboard/ProductUpdateForm";
import { get24ProductsAdmin, getCountProduct } from "@/app/utils/apiCalls";
import { Pagination } from "@/app/components/helpers/Pagination";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ProductType } from "@/app/types";
import { PriceUpdateForm } from "@/app/components/dashboard/PriceUpdateForm";
import { QuantityUpdateForm } from "@/app/components/dashboard/QuantityUpdateForm";

export default function ProductsPage() {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [count, setCount] = useState(0);
    const [reload, setReload] = useState(true);

    const page = useSearchParams().get("page") || 1;

    const fetchInfo = async () => {
        const productData = await get24ProductsAdmin(Number(page));
        const countData = await getCountProduct();
        setProducts(productData);
        setCount(countData);
    };
    useEffect(() => {
        fetchInfo();
        console.log("reloading");
    }, [page, reload]);

    return (
        <main>
            <Pagination count={count} take={24} />
            <p>Count: {count} </p>
            <div className="grid grid-cols-2 gap-3 ">
                {products.map((item, index) => (
                    <div key={index}>
                        <ProductUpdateForm setReload={setReload} data={item} />
                        <PriceUpdateForm
                            setReload={setReload}
                            price_id={item.default_price}
                        />
                        <QuantityUpdateForm
                            setReload={setReload}
                            product_id={item.product_id}
                        />
                    </div>
                ))}
            </div>
        </main>
    );
}
