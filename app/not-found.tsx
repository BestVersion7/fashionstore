import Link from "next/link";

export default function NotFound() {
    return (
        <div>
            <Link href="/" className="underline text-2xl text-orange-600">
                Back to Home
            </Link>
            <h2>Not Found</h2>
            <p>Could not find requested resource</p>
        </div>
    );
}
