// import { CartTotal } from "./components/CartTotal";
// import { Product } from "./components/Product";
// import { ProductType } from "./types";
// import { getAllProducts } from "./utils/apiCalls";

// export default async function Home() {
//     const products: ProductType[] = await getAllProducts();

//     return (
//         <main>
//             <div className="p-1 ">
//                 <CartTotal />
//             </div>
//             {/* Product Page */}
//             <div className="grid grid-cols-3 gap-5">
//                 {products.map((item) => (
//                     <Product key={item.id} {...item} />
//                 ))}
//             </div>
//         </main>
//     );
// }

export default function Page() {
    return <div>test</div>;
}
