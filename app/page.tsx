import Image from "next/image";
import { CartTotal } from "./components/CartTotal";
import { Product } from "./components/Product";
import { ProductType } from "./types";
import { getAllProducts } from "./utils/apiCalls";
import Link from "next/link";

export default async function Home() {
    // const products: ProductType[] = await getAllProducts();

    const x =
        "This is 100% imported European cashmere sweater designed to last a lifetime.";
    console.log(x.split("").length);
    return (
        <main>
            {/* name of product */}
            <h2>Milano</h2>
            {/* description of product */}
            <p>Description</p>
            {/* metadata key id pair */}
            <ul>
                <li>Natural mother-of-pearl flat buttons</li>
                <li>100% natural </li>
            </ul>
            {/* we want to have custom links  */}
            {/* link management 
                /shop/
            */}
            <Link href="/">Shop now</Link>
        </main>
    );
}
