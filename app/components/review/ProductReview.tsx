"use client";
import { useEffect, useState } from "react";
import {
    getTenProductReviewsByPage,
    getProductReviewCount,
    getProductRatingAverage,
} from "../../utils/apiCalls";
import { ProductReviewComments } from "./ProductReviewComments";
import { ProductReviewType } from "../../types";
import { FaStar } from "react-icons/fa";
import { ProductReviewForm } from "./ProductReviewForm";
import { SignInBtn } from "../account/SignInBtn";

type props = {
    product_id: number;
    email: string | undefined | null;
};

export const ProductReview = (props: props) => {
    const [reviews, setReviews] = useState<ProductReviewType[]>([]);
    const [reviewCount, setReviewCount] = useState(0);
    const [reviewRating, setReviewRating] = useState(0);
    const [page, setPage] = useState(1);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        async function getReviews(signal: AbortSignal) {
            const reviewsData = await getTenProductReviewsByPage(
                props.product_id,
                page,
                signal
            );
            const countData = await getProductReviewCount(props.product_id);
            const ratingData = await getProductRatingAverage(props.product_id);
            setReviews(reviewsData);
            setReviewCount(countData);
            setReviewRating(ratingData);
        }
        const controller = new AbortController();
        getReviews(controller.signal);
        return () => {
            controller.abort();
        };
    }, [reload]);

    let reviewPagination: number[] = [];

    const loopCount = Math.ceil(reviewCount / 10) + 1;
    for (let i = 1; i < loopCount; i++) {
        reviewPagination.push(i);
    }

    const handlePaginate = (e: React.MouseEvent<HTMLButtonElement>) => {
        setPage(Number(e.currentTarget.value));
        setReload((val) => !val);
    };

    return (
        <>
            {!props.email ? (
                <>
                    <textarea
                        placeholder="Please sign in to comment."
                        rows={1}
                        className="border border-black px-2 w-full"
                        disabled={true}
                    />
                    <SignInBtn />
                </>
            ) : (
                <>
                    <ProductReviewForm
                        email={props.email}
                        product_id={props.product_id}
                        setReload={setReload}
                    />
                </>
            )}
            <div>
                <div>
                    <p className="flex gap-1 text-xl font-bold">
                        <span>Average Rating: </span>
                        <span className="flex items-center">
                            {reviewRating > 1
                                ? Number(reviewRating).toFixed(2)
                                : "Be the first to review."}
                            <span className="text-orange-400">
                                <FaStar />
                            </span>
                        </span>
                    </p>
                </div>
                <div className="text-lg font-semibold flex justify-between">
                    <div className="">Reviews ({reviewCount}):</div>
                    {reviewCount > 0 && (
                        <div>
                            Page:
                            {reviewPagination.map((item) => (
                                <button
                                    onClick={handlePaginate}
                                    type="button"
                                    key={item}
                                    value={item}
                                    className={`${
                                        item === page && "underline"
                                    } px-2 hover:underline`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {reviews.map((item, index) => (
                <ProductReviewComments key={index} {...item} />
            ))}
        </>
    );
};
