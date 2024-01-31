import Link from "next/link";
import { SignOutBtn } from "../components/account/SignoutBtn";
export default function TestPage() {
    return (
        <div className="dropdown-menu absolute  top-6 ">
            <div className="z-20 px-5 gap-2 w-60 py-3 bg-slate-600 text-white flex flex-col items-start shadow-xl rounded-md">
                <Link href="/account" className="hover:underline">
                    Edit account details
                </Link>
                <Link href="/account/orders" className="hover:underline">
                    View past orders
                </Link>
                <br />
                <SignOutBtn />
            </div>
            <div className="h-40"></div>
        </div>
    );
}
