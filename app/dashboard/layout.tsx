import Link from "next/link";

export default function Layout(props: { children: React.ReactNode }) {
    return (
        <main>
            <nav className="flex gap-2">
                <Link className="link-button" href="/dashboard">
                    Dashboard
                </Link>
                <Link className="link-button" href="/dashboard/products">
                    Products
                </Link>
                <Link className="link-button" href="/dashboard/orders">
                    Orders
                </Link>
                <Link className="link-button" href="/dashboard/reviews">
                    Reviews
                </Link>
                <Link className="link-button" href="/dashboard/users">
                    Users
                </Link>
            </nav>
            {props.children}
        </main>
    );
}
