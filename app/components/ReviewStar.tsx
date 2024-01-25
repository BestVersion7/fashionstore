import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import Link from "next/link";

export const ReviewStar = (props: {
    count: number;
    average: number;
    link?: string;
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

    if (Number(props.average) === 5) {
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
    } else if (props.average > 3.3) {
        star = (
            <span className="flex">
                <FullStar />
                <FullStar />
                <FullStar />
                <HalfStar />
                <EmptyStar />
            </span>
        );
    } else if (props.average > 2.8) {
        star = (
            <span className="flex">
                <FullStar />
                <FullStar />
                <FullStar />
                <EmptyStar />
                <EmptyStar />
            </span>
        );
    } else if (props.average > 2.3) {
        star = (
            <span className="flex">
                <FullStar />
                <FullStar />
                <HalfStar />
                <EmptyStar />
                <EmptyStar />
            </span>
        );
    } else if (props.average > 1.8) {
        star = (
            <span className="flex">
                <FullStar />
                <FullStar />
                <EmptyStar />
                <EmptyStar />
                <EmptyStar />
            </span>
        );
    } else if (props.average > 1.3) {
        star = (
            <span className="flex">
                <FullStar />
                <HalfStar />
                <EmptyStar />
                <EmptyStar />
                <EmptyStar />
            </span>
        );
    } else if (props.average > 0.8) {
        star = (
            <span className="flex">
                <FullStar />
                <EmptyStar />
                <EmptyStar />
                <EmptyStar />
                <EmptyStar />
            </span>
        );
    } else if (props.average > 0.3) {
        star = (
            <span className="flex">
                <HalfStar />
                <EmptyStar />
                <EmptyStar />
                <EmptyStar />
                <EmptyStar />
            </span>
        );
    } else {
        star = (
            <span className="flex">
                <EmptyStar />
                <EmptyStar />
                <EmptyStar />
                <EmptyStar />
                <EmptyStar />
            </span>
        );
    }

    return (
        <div className="flex items-center gap-1">
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
            {props.link && (
                <Link
                    href={props.link}
                    className="text-blue-600 hover:text-orange-400 "
                >
                    {props.count}
                </Link>
            )}
        </div>
    );
};
