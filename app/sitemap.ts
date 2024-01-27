import { MetadataRoute } from "next";
import { getAllProducts } from "./utils/apiCalls";
import { BASE_URL } from "./lib/constants";
import { ProductType } from "./types";
import { formatProductNameToUrl } from "./utils/format";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // const products: ProductType[] = await getAllProducts();
    // const mappedProducts: {
    //     url: string;
    //     lastModified: Date;
    //     changeFrequency: "weekly";
    //     priority: number;
    // }[] = products.map((item) => {
    //     return {
    //         url: `${BASE_URL}/${formatProductNameToUrl(item.name)}/${
    //             item.product_id
    //         }`,
    //         lastModified: new Date(),
    //         changeFrequency: "weekly",
    //         priority: 0.8,
    //     };
    // });

    return [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/shop`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/shop/tops`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/privacy`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.5,
        },

        // ...mappedProducts,
    ];
}
