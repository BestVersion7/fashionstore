"use client";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createUser } from "../utils/apiCallsClient";

export const SignInBtn = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // create the User if not exists
        await createUser(emailRef.current?.value);

        signIn("email", {
            email: emailRef.current?.value,
            redirect: false,
            callbackUrl: "/account",
        });

        router.push(`${window.location.href}?signinmodal=t`, {
            scroll: false,
        });
    };

    const handleClose = () => {
        router.push(window.location.pathname, { scroll: false });
    };
    const modal = useSearchParams().get("signinmodal");

    return (
        <div className="grid w-72 gap-4">
            <button
                className="grid grid-cols-[auto,_1fr] p-3 bg-slate-800 text-white  border border-solid border-black rounded-lg"
                type="button"
                onClick={() => signIn("github", { callbackUrl: "/account" })}
            >
                <span className="text-3xl ">
                    <FaGithub />
                </span>
                <span className="text-lg">Sign in with Github</span>
            </button>
            <button
                className="grid grid-cols-[auto,_1fr] p-3 bg-white  border border-solid border-black rounded-lg"
                type="button"
                onClick={() => signIn("google", { callbackUrl: "/account" })}
            >
                <span className="text-3xl ">
                    <FcGoogle />
                </span>
                <span className="text-lg">Sign in with Google</span>
            </button>

            <p className="flex text-slate-500 before:border-b-2 before:border-slate-500 before:m-auto before:flex-1 after:flex-1 after:m-auto after:border-b-2 after:border-slate-500">
                <span className="w-2"></span>
                or
                <span className="w-2"></span>
            </p>

            <form onSubmit={handleSubmit}>
                <label className="font-medium">Email</label>
                <input
                    ref={emailRef}
                    title="email"
                    placeholder="email@example.com"
                    type="email"
                    required
                    className="w-full pl-4 py-1 rounded-lg border border-slate-400 placeholder:text-slate-500"
                />
                <button
                    className="mt-2 text-lg bg-blue-600 text-white w-full text-center p-3 rounded-lg hover:bg-blue-700"
                    type="submit"
                >
                    Sign in with Email
                </button>
            </form>

            {modal === "t" && (
                <div
                    className="relative z-10"
                    aria-labelledby="modal-title"
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

                    <div className="fixed px-3 text-center flex flex-col justify-evenly inset-0 m-auto z-10 bg-blue-100 h-52 w-64 ">
                        <h2 className="text-2xl font-medium">
                            Check your email
                        </h2>
                        <p>
                            A sign in link has been sent to your email address.
                        </p>
                        <button
                            className="bg-orange-300 rounded-md py-2 font-medium tracking-wider hover:bg-orange-400"
                            onClick={handleClose}
                            type="button"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
