import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import Link from "next/link";

export const ReviewStar = (props: {
    count: number;
    average: number;
    link: string;
}) => {
    let star;

    const backgroundColor = "text-orange-400";

    const FullStar = () => (
        <span className={backgroundColor}>
            <FaStar />
        </span>
    );
    const EmptyStar = () => (
        <span className={backgroundColor}>
            <FaRegStar />
        </span>
    );
    const HalfStar = () => (
        <span className={backgroundColor}>
            <FaStarHalfAlt />
        </span>
    );

    if (props.average === 5) {
        star = (
            <span className="flex">
                <FullStar />
                <FullStar />
                <FullStar />
                <FullStar />
                <FullStar />
            </span>
        );
    } else if (props.average > 4.3) {
        star = (
            <span className="flex">
                <FullStar />
                <FullStar />
                <FullStar />
                <FullStar />
                <HalfStar />
            </span>
        );
    } else if (props.average > 3.8) {
        star = (
            <span className="flex">
                <FullStar />
                <FullStar />
                <FullStar />
                <FullStar />
                <EmptyStar />
            </span>
        );
    }

    return (
        <Link href={props.link} className="flex items-center gap-1">
            {props.count < 1 ? (
                <div className="flex">
                    <EmptyStar />
                    <EmptyStar />
                    <EmptyStar />
                    <EmptyStar />
                    <EmptyStar />
                </div>
            ) : (
                <div className="flex">{star}</div>
            )}
            <span className="text-blue-600 hover:text-orange-400 ">
                {props.count}
            </span>
        </Link>
    );
};
