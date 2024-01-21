// "use client";
// import { useState } from "react";

export default async function TestPage() {
    // const [fire, setFire] = useState("s");
    // const data = await fetch('http://localhost:3000/api/order', {
    //     headers: process.env.API_KEY
    // })
    // console.log(process.env.API_KEY);
    return (
        <main>
            <form onSubmit={handleDelete}>
                <select
                    title="changeQ"
                    onChange={handleChangeQuantity}
                    name="quantity"
                    id="quantity"
                    className="border border-black border-solid bg-gray-200 shadow-md rounded-md px-1"
                >
                    {quantityMap.map((item) => (
                        <option key={item} value={item}>
                            Qty: {item}
                        </option>
                    ))}
                </select>
                <br />
                <button
                    type="submit"
                    className=" bg-inherit border-none font-medium text-xs text-blue-700 hover:cursor-pointer hover:underline"
                >
                    Delete
                </button>
            </form>
        </main>
    );
}
