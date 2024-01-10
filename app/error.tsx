"use client"; // Error components must be Client components

import { useEffect } from "react";
import Link from "next/link";

export default function Error({ error, reset }: { error: any; reset: any }) {
    useEffect(() => {
        // console.error(error);
    }, [error]);

    return (
        <main>
            <h2>Something went wrong</h2>{" "}
            <button type="button" onClick={() => reset()}>
                Try again
            </button>
            <br />
            <Link href="/" className="underline text-2xl text-orange-600">
                Back to Home
            </Link>
        </main>
    );
}
