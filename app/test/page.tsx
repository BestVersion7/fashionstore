import { get24Products, getPopularProducts } from "../utils/apiCalls";

export default async function TestPage() {
    const popular = await get24Products(2);
    return (
        <div className=" ">
            test TestPage fdsljkfds
            {popular.map((item, index) => (
                <p key={index}>{Number(item.product_id)}</p>
            ))}
        </div>
    );
}
