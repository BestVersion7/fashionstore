"use client";

import { AccountHover } from "../components/AccountHover";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";
import { useRouter } from "next/navigation";
import { deleteCartCookie } from "../utils/apiCalls";

export default function TestPage() {
    // const res = await fetch("http://localhost:3000/api/order", {
    //     cache: "no-cache",
    // });
    // const data = await res.json();
    // console.log(data);
    // const session = await getServerSession(authOptions);
    // console.log(session);

    const router = useRouter();
    const handleClick = async () => {
        await deleteCartCookie();
        router.push("/");
        router.refresh();
    };
    return (
        <main>
            <button type="button" onClick={handleClick}>
                Reload
            </button>
        </main>
    );
}
