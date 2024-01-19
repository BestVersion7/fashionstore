import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";

export default async function AccountPage() {
    const session = await getServerSession(authOptions);

    return (
        <main>
            <h2>Thanks for signing in {session?.user?.name}.</h2>
            <p>
                Click <Link href="/checkout">here</Link> to checkout your
                products.
            </p>
            <p>
                Click <Link href="/checkout">here</Link> to view your past
                purchases.
            </p>
        </main>
    );
}
