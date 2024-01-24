// // "use client";

// import { Notification } from "./Notification";
// import { NotificationBtn } from "./NotificationBtn";
// import { NotificationMap } from "./NotificationMap";
// import { useState } from "react";

// export let msgArr: { message: string }[] = [{ message: "3" }, { message: "5" }];

// export default function TestPage() {
//     const products = [
//         {
//             name: "Product-1",
//         },
//         {
//             name: "Product-2",
//         },
//         {
//             name: "Product-3",
//         },
//         {
//             name: "Product-4",
//         },
//     ];

//     // const [reload, setReload] = useState(false);

//     return (
//         <main>
//             <h2>This is a test page</h2>

//             <div className="grid gap-3">
//                 {products.map((item, index) => (
//                     <div key={index} className="flex items-center gap-2">
//                         <p>{item.name}</p>
//                         <NotificationBtn />
//                     </div>
//                 ))}
//             </div>

//             <NotificationMap />

//             <div className="h-[1000px]"></div>
//         </main>
//     );
// }
"use client";
const testData = [1, 2, 3];
import { useRouter } from "next/navigation";
export default function love() {
    const router = useRouter();
    const handleRemove = () => {
        testData.shift();
        router.refresh();
    };
    return (
        <main>
            h <button onClick={handleRemove}>Pop</button>
            {testData.map((item) => (
                <p key={item}>{item}</p>
            ))}
        </main>
    );
}
