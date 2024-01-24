// "use client";

// import { useState, memo } from "react";

// export const Notification = memo((props: { message: string }) => {
//     const [showMsg, setShowMsg] = useState(true);

//     setTimeout(() => setShowMsg(() => false), 1000);

//     return (
//         <>
//             {showMsg && (
//                 <div className="bg-orange-600  py-1 font-medium w-full px-4 flex  justify-between">
//                     <p className="text-white">{props.message}</p>
//                     <button
//                         type="button"
//                         className="border border-solid px-1 bg-white text-sm"
//                     >
//                         X
//                     </button>
//                 </div>
//             )}
//         </>
//     );
// });
