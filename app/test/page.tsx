import { AccountHover } from "../components/AccountHover";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";

export default async function TestPage() {
    const res = await fetch("http://localhost:3000/api/order", {
        cache: "no-cache",
    });
    const data = await res.json();
    console.log(data);
    // const session = await getServerSession(authOptions);
    // console.log(session);

    return (
        <main>
            <div className="dropdown relative">
                <span className="border-solid border-2">Hover me:</span>
                <AccountHover />
            </div>
        </main>
    );
}
