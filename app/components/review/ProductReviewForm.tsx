"use client";
import { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { createProductReview } from "../../utils/apiCallsClient";
import { useRouter } from "next/navigation";

export const ProductReviewForm = (props: {
    email: string | undefined | null;
    product_id: number;
    setReload: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const [reviewStar, setReviewStar] = useState(0);
    const [reviewMsg, setReviewMsg] = useState("");
    const router = useRouter();

    const handleSubmitReview = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = await createProductReview(props.product_id, {
            product_id: props.product_id,
            review_message: reviewMsg,
            user_email: props.email ?? "",
            review_star: reviewStar,
        });

        if (data.status === 400) {
            router.refresh();
        } else {
            setReviewMsg("");
            setReviewStar(0);
            router.refresh();
            props.setReload((val) => !val);
        }
    };

    return (
        <form onSubmit={handleSubmitReview} className="grid gap-2">
            <div className="text-xl font-medium">
                <h3>Product Rating:</h3>
                <div className="flex items-center gap-1 ">
                    {[1, 2, 3, 4, 5].map((item) => (
                        <button
                            className="relative"
                            title={`${item} star`}
                            type="button"
                            key={item}
                            value={item}
                            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                                setReviewStar(Number(e.currentTarget.value))
                            }
                        >
                            <FaRegStar
                                className="text-orange-400 hover:text-orange-600 
                                "
                            />
                            <FaStar
                                className={`${
                                    item <= reviewStar ? "block" : "hidden"
                                } absolute  top-0 left-0 text-orange-500`}
                            />
                        </button>
                    ))}
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
                rows={3}
                className="border border-black px-2"
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
