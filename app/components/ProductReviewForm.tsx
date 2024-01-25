"use client";
import { useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { createProductReview } from "../utils/apiCalls";
import { useRouter } from "next/navigation";

export const ProductReviewForm = (props: {
    email: string;
    product_id: string;
}) => {
    const [reviewStar, setReviewStar] = useState(0);
    const [reviewMsg, setReviewMsg] = useState("");
    const router = useRouter();

    const handleSubmitReview = async (e: React.FormEvent) => {
        e.preventDefault();

        await createProductReview(props.product_id, {
            product_id: props.product_id,
            review_message: reviewMsg,
            user_email: props.email,
            review_star: reviewStar,
        });

        setReviewStar(0);
        router.refresh();
    };

    return (
        <form onSubmit={handleSubmitReview} className="grid gap-2">
            <div>
                <h3>Overall Rating:</h3>
                <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((item) => (
                        <button
                            title={`${item} star`}
                            type="button"
                            key={item}
                            value={item}
                            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                                setReviewStar(Number(e.currentTarget.value))
                            }
                        >
                            <span className="text-orange-400 hover:text-orange-600 ">
                                <FaRegStar />
                            </span>
                        </button>
                    ))}
                    {reviewStar < 1 ? (
                        ""
                    ) : (
                        <span className="text-lg text-blue-600 font-bold">
                            {reviewStar}
                        </span>
                    )}
                </div>
            </div>

            <textarea
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setReviewMsg(e.target.value)
                }
                value={reviewMsg}
                placeholder="What's most important to know?"
                name="reviewform"
                id="reviewform"
                rows={4}
                className="border border-black"
            />

            <button
                className="my-2 w-20 py-1 rounded-xl bg-yellow-400 hover:bg-yellow-500"
                type="submit"
            >
                Submit
            </button>
        </form>
    );
};
