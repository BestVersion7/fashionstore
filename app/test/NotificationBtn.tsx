// "use client";
// import { msgArr } from "./page";
// import { useRouter } from "next/navigation";

// type MsgArrType = {
//     message: string;
// }[];

// export const NotificationBtn = () => {
//     const router = useRouter();
//     const handleTrigger = () => {
//         msgArr.push({ message: "vb" });
//         router.refresh();
//         // console.log(msgArr);

//         // props.setReload((val) => !val);
//         // console.log(msgArr);
//     };
//     return (
//         <button
//             className="text-sm bg-red-600 py-2 px-3 text-white hover:bg-red-700"
//             type="button"
//             onClick={handleTrigger}
//         >
//             Add
//         </button>
//     );
// };
