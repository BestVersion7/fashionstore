"use client";
import { signOut } from "next-auth/react";

export const SignOutBtn = () => {
    return (
        <>
            <button type="button" onClick={() => signOut()}>
                Signout
            </button>
        </>
    );
};
