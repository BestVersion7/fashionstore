import Link from "next/link";
import { HomeProductCardProps } from "../types";

export const HomeProductCard = (props: HomeProductCardProps) => {
    return (
        <article className=" flex flex-col gap-2 justify-evenly bg-white border border-black border-solid rounded-sm px-6 pt-2 pb-3 md:pt-3 md:pb-4">
            {props.title1 && (
                <p className="font-medium text-xl text-red-700">
                    {props.title1}
                </p>
            )}
            <h2 className="font-bold text-2xl">{props.title2}</h2>
            <p className="text-slate-700">{props.description}</p>

            <Link
                className="text-center px-6 py-3 font-medium text-white bg-orange-700 hover:bg-yellow-500"
                href={props.link}
            >
                {props.linktext}
            </Link>
        </article>
    );
};
