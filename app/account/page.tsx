import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";

export const metadata = {
    title: "Account",
    description: "Account for Afashionstore",
};

export default async function AccountPage() {
    const session = await getServerSession(authOptions);

    return (
        <main>
            <h2>Thanks for signing in {session?.user?.name}.</h2>
            <p className="mt-3">
                View past purchases:{" "}
                <Link
                    className="rounded-md bg-orange-300  px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-orange-400 hover:cursor-pointer"
                    href="/account/orders"
                >
                    Purchases
                </Link>
            </p>{" "}
            <br />
            <p>
                Continue shopping:{" "}
                <Link
                    className="rounded-md bg-orange-300  px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-orange-400 hover:cursor-pointer"
                    href="/shop"
                >
                    Shop
                </Link>
            </p>
        </main>
    );
}
