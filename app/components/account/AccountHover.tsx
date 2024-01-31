import { SignOutBtn } from "./SignoutBtn";
import { RiAccountCircleLine } from "react-icons/ri";
import { authOptions } from "../../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import Link from "next/link";

export const AccountHover = async () => {
    const session = await getServerSession(authOptions);

    return (
        <div className="relative py-4 dropdown flex items-center hover:cursor-pointer ">
            <span className="text-3xl">
                <RiAccountCircleLine />
            </span>
            <div className="flex flex-col items-center">
                <span className="text-lg font-medium ">Account</span>

                {/* this is to make bg gray */}
                {/* <div className="dropdown-bg hidden fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div> */}
                <div className="dropdown-menu hidden absolute top-[59px] z-20 px-5 font-semibold tracking-tight w-48 py-3 bg-cyan-600 shadow-xl rounded-md text-sm">
                    {/* check for session user different hover screen */}

                    {!session ? (
                        <div className="text-sm">
                            <Link className="hover:underline" href="/signin">
                                Sign In / Sign Up
                            </Link>
                        </div>
                    ) : (
                        <div className="flex flex-col items-start gap-2">
                            <Link href="/account" className="hover:underline">
                                Edit account details
                            </Link>
                            <Link
                                href="/account/orders"
                                className="hover:underline"
                            >
                                View past orders
                            </Link>
                            <br />
                            <SignOutBtn />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
