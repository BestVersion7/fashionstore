"use client";

import { ProductForm } from "@/app/components/admin/ProductForm";
import { get24ProductsAdmin, getCountProduct } from "@/app/utils/apiCalls";
import { Pagination } from "@/app/components/helpers/Pagination";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ProductType } from "@/app/types";

export default function ProductsPage() {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [count, setCount] = useState(0);

    const page = useSearchParams().get("page") || 1;

    const fetchInfo = async () => {
        const productData = await get24ProductsAdmin(Number(page));
        const countData = await getCountProduct();
        setProducts(productData);
        setCount(countData);
    };
    useEffect(() => {
        fetchInfo();
    }, [page]);

    return (
        <main>
            <Pagination page={count} />
            <div className="grid grid-cols-2 gap-3 ">
                {products.map((item, index) => (
                    <ProductForm key={index} {...item} />
                ))}
            </div>
        </main>
    );
}
