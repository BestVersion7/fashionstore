"use client";
import { signOut } from "next-auth/react";

export const SignOutBtn = () => {
    return (
        <>
            <button
                className="hover:underline"
                type="button"
                onClick={() => signOut()}
            >
                Sign out
            </button>
        </>
    );
};
