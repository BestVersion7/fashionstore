import { SignOutBtn } from "./SignoutBtn";
import { RiAccountCircleLine } from "react-icons/ri";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Link from "next/link";

export const AccountHover = async () => {
    const session = await getServerSession(authOptions);

    return (
        <div className="relative dropdown flex items-center text-white hover:cursor-pointer ">
            <span className="text-3xl">
                <RiAccountCircleLine />
            </span>
            <div className="flex flex-col items-center">
                <span className=" font-medium leading-4">Account</span>

                {/* this is to make bg gray */}
                {/* <div className="dropdown-bg hidden fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div> */}
                <ul className="absolute top-8 dropdown-menu hidden text-black bg-violet-50 border border-solid border-violet-500 text-center w-52 py-2">
                    {/* check for session user different hover screen */}

                    {!session ? (
                        <>
                            <li className="text-sm">
                                <Link
                                    className="bg-yellow-200 text-lg px-2 border border-solid border-black shadow-md hover:bg-yellow-300"
                                    href="/signin"
                                >
                                    Sign In / Sign Up
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="text-l font-bold">Your Account</li>
                            <li className="text-sm">
                                <Link href="/account">Account</Link>
                            </li>
                            <li className="text-sm">Orders</li>
                            <li className="text-sm">
                                <SignOutBtn />
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
};
