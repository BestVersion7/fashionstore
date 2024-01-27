import { HomeProductCard } from "./components/HomeProductCard";
import Link from "next/link";
import Image from "next/image";
import { getAllProducts, getProductAvailableQuantity } from "./utils/apiCalls";
import { BestSellerCard } from "./components/BestSellerCard";

export default async function Home() {
    // change  this in future
    const hotProducts = await getProductAvailableQuantity(
        "prod_PI4yezOWxk8uzz"
    );
    // console.log(hotProducts);
    return (
        <main className="px-0 py-0">
            <section className="bg-yellow-400 px-4 pt-2 pb-3 flex flex-col items-center md:flex-row md:justify-between">
                <p className="">
                    Sign up for our newsletter and <b>Buy Two Get One FREE</b>.
                    Ends 1/31.
                </p>
                <Link
                    className="bg-white rounded-lg px-4 py-2 border border-solid border-black hover:bg-green-100"
                    href="/"
                >
                    Claim Offer
                </Link>
            </section>

            <section className="grid lg:grid-cols-2 ">
                <div className="relative h-[550px] ">
                    <Image
                        className="object-cover"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        alt="picture"
                        priority
                        src={
                            "https://res.cloudinary.com/crimson-flamingo/image/upload/v1704864566/ecommerce/bg1new.png"
                        }
                    />
                    <div className="absolute w-64 h-80 top-20 left-8">
                        <HomeProductCard
                            title1="100% LUXURY CASHMERE"
                            title2="Luxurious Silk Dresses"
                            description="Shop the finest luxury silk dresses for casual or formal evening wear."
                            link="/shop/dress"
                            linktext="SHOP DRESSES"
                        />
                    </div>
                </div>
                <div className="relative h-[550px] ">
                    <Image
                        className="object-cover"
                        fill
                        quality={100}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        alt="picture"
                        priority
                        src={
                            "https://res.cloudinary.com/crimson-flamingo/image/upload/v1704864563/ecommerce/bg3new.png"
                        }
                    />
                    <div className="absolute w-64 h-80 top-20 right-8">
                        <HomeProductCard
                            title1="100% ULTRA-PREMIUM SILK"
                            title2="Silk Blouses and Tops"
                            description="Shop our luxury silk button-up blouses made with ultra-soft, washable silk."
                            link="/shop/tops"
                            linktext="SHOP TOPS"
                        />
                    </div>
                </div>

                <div className="relative h-[550px] ">
                    <Image
                        className="object-cover"
                        fill
                        quality={100}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        alt="picture"
                        priority
                        src={
                            "https://res.cloudinary.com/crimson-flamingo/image/upload/v1704868154/ecommerce/home1new.png"
                        }
                    />
                    <div className="absolute w-64 h-80 top-20 left-8">
                        <HomeProductCard
                            title2="Dry cleaning and caring instructions"
                            link="/"
                            linktext="Care Instructions"
                            description="How to care for your garments that will last many years."
                        />
                    </div>
                </div>
                <div className="relative h-[550px] ">
                    <Image
                        className="object-cover"
                        fill
                        quality={100}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        alt="picture"
                        priority
                        src={
                            "https://res.cloudinary.com/crimson-flamingo/image/upload/v1704868572/ecommerce/origin2new.png"
                        }
                    />
                    <div className="absolute w-64 h-80 top-20 right-8">
                        <HomeProductCard
                            title2="About our unique products"
                            link="/"
                            linktext="Our Story"
                            description="Discover the origins of FashionStore and how we can serve you."
                        />
                    </div>
                </div>
            </section>

            <section className=" bg-red-50">
                <h3>New & Hot</h3>
                <div className="grid grid-cols-5 overflow-hidden">
                    {/* {hotProducts.map((item, index) => (
                        <div key={index}>
                            <BestSellerCard {...item} />
                        </div>
                    ))} */}
                </div>
            </section>

            <section className="flex flex-col text-center items-center gap-10 py-8">
                <h2 className="text-2xl tracking-wide font-extrabold ">
                    Live Beautifully
                </h2>
                <p className="w-72 md:w-[650px]">
                    In the age of fast fashion and emerging trends, timeless
                    classics never age. Cherish forever the beautiful body you
                    have and match it with a stunning dress.
                </p>
                <div className="w-72 ">
                    <HomeProductCard
                        title2="Free shipping and easy returns"
                        link="/"
                        linktext="Returns"
                        description="We accept most returns on unworn items in original packaging."
                    />
                </div>
            </section>

            <section className="bg-orange-200 gap-4 text-center py-10 flex flex-col items-center">
                <p className="">We{`'`}d love to hear what you think!</p>
                <Link
                    className="rounded-lg font-bold  bg-slate-50 py-3 border w-40 border-black border-solid hover:bg-green-100"
                    href="/"
                >
                    Give feedback
                </Link>
            </section>
        </main>
    );
}
