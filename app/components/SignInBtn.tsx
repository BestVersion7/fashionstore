"use client";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export const SignInBtn = () => {
    return (
        <div className="grid w-72 gap-4">
            <button
                className="grid grid-cols-[auto,_1fr] px-3 py-2 bg-slate-800 text-white  border border-solid border-black rounded-lg"
                type="button"
                onClick={() => signIn("github", { callbackUrl: "/account" })}
            >
                <span className="text-3xl ">
                    <FaGithub />
                </span>
                <span className="text-lg">Sign in with Github</span>
            </button>
            <button
                className="grid grid-cols-[auto,_1fr] px-3 py-2 bg-white  border border-solid border-black rounded-lg"
                type="button"
                onClick={() => signIn("google", { callbackUrl: "/account" })}
            >
                <span className="text-3xl ">
                    <FcGoogle />
                </span>
                <span className="text-lg">Sign in with Google</span>
            </button>
        </div>
    );
};
