import { getUserNameByEmail } from "../utils/apiCalls";
import { ProductReviewType } from "../types";
import { ReviewStar } from "./ReviewStar";

export const ProductReview = (props: ProductReviewType) => {
    const userName = getUserNameByEmail(props.user_email);
    // console.log(typeof props.created_at);

    return (
        <article className=" px-2 border border-gray-400  py-2 ">
            <p className="font-medium">{userName}</p>

            <div className="flex gap-1 items-center">
                <ReviewStar count={1} average={props.review_star} />
            </div>

            <div>
                <p>Reviewed on {props.created_at.split("T")[0]}</p>
                <p>{props.review_message}</p>
            </div>
        </article>
    );
};
