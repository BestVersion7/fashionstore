import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { SearchInput } from "./components/SearchInput";
import { CartTotal } from "./components/CartTotal";
import { PiShootingStarBold } from "react-icons/pi";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FooterInput } from "./components/FooterInput";
import { FaSquareXTwitter } from "react-icons/fa6";

export const metadata: Metadata = {
    title: "Fashion Store",
    description: "No name, no brand, no premium clothing.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <header className="sticky top-0 z-10">
                    <nav className="flex px-6 text-slate-100 py-4 justify-between bg-slate-600 items-center">
                        <div className="flex ">
                            <Link
                                href="/"
                                className="hidden text-3xl text-purple-100 font-bold md:inline"
                            >
                                FASHIONSTORE
                            </Link>

                            {/* this icon when small screen */}
                            <Link
                                href="/"
                                className="md:hidden text-purple-100 text-3xl  font-bold"
                            >
                                <PiShootingStarBold />
                            </Link>

                            <Link
                                className=" pl-4 text-orange-300 font-bold text-2xl "
                                href="/shop"
                            >
                                SHOP
                            </Link>
                            {/* <Link
                                className=" pl-4 text-orange-300 font-bold text-2xl "
                                href="/about"
                            >
                                DEALS
                            </Link> */}
                        </div>

                        <div className="flex gap-5">
                            <span className="hidden italic text-base lg:block w-32 leading-4 text-slate-100 lg:mr-3">
                                Free U.S. Shipping & Returns
                            </span>

                            <div className="hidden items-center w-56 bg-white  md:grid">
                                <SearchInput />
                            </div>

                            <Link href="/cart" className="">
                                <span className="flex">
                                    <CartTotal />
                                    <span className="text-2xl  font-bold">
                                        Cart
                                    </span>
                                </span>
                            </Link>
                        </div>
                    </nav>
                </header>

                {children}

                <footer className="bg-gray-800  text-slate-200  px-4 py-2 ">
                    <section className="flex justify-between mb-4  sm:justify-center gap-5">
                        <h3 className="text-xl text-purple-100 font-extrabold">
                            FASHIONSTORE
                        </h3>
                        <span className="flex text-3xl gap-2">
                            <Link
                                href="https://facebook.com"
                                className="text-blue-400"
                            >
                                <FaFacebook />
                            </Link>
                            <Link
                                href="https://instagram.com"
                                className="text-orange-500"
                            >
                                <FaInstagram />
                            </Link>
                            <Link
                                className="text-white"
                                href="https://twitter.com"
                            >
                                <FaSquareXTwitter />
                            </Link>
                        </span>
                    </section>

                    <div className="sm:grid sm:grid-cols-2 gap-y-6">
                        <section className="mb-4">
                            <h3 className="font-bold text-orange-300">
                                CONTACT US
                            </h3>
                            <span className="text-sm">
                                Info@afashionstore.com
                            </span>
                        </section>

                        <section className="mb-4">
                            <h3 className="font-bold text-orange-300">
                                MAKE MONEY WITH US
                            </h3>
                            <span className="text-sm">
                                Become an Affiliate <br />
                            </span>
                        </section>

                        <section className="mb-4">
                            <h3 className="font-bold text-orange-300">
                                CUSTOMER CARE
                            </h3>
                            <span className="text-sm">
                                Returns & Exchanges <br />
                                Size Guide <br />
                                Shipping
                            </span>
                        </section>

                        <section className="mb-4">
                            <h3 className="font-bold text-orange-300">
                                BECOME AN INSIDER
                            </h3>

                            <span className="text-sm">
                                Be the first to know about new styles and
                                colours.
                            </span>
                            <br />

                            <FooterInput />
                        </section>
                    </div>

                    <p className="text-center">
                        &#169; 2024 FashionStore LLC. All Rights Reserved. |{" "}
                        <Link href="/privacy">Privacy</Link>
                    </p>
                </footer>
            </body>
        </html>
    );
}
