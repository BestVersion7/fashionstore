"use client";
import { signIn } from "next-auth/react";

export const SignInBtn = () => {
    return (
        <>
            <button
                className="p-3 bg-yellow  border border-solid border-black rounded"
                type="button"
                onClick={() => signIn("github")}
            >
                Github
            </button>
            <br />
            <button type="button" onClick={() => signIn("google")}>
                Google
            </button>
        </>
    );
};
