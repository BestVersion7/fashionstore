import { CartTotal } from "./components/CartTotal";
import { Product } from "./components/Product";
import { ProductType } from "./types";
import { getAllProducts } from "./utils/apiCalls";

export default async function Home() {
    const products: ProductType[] = await getAllProducts();

    return <main>Home Page</main>;
}
