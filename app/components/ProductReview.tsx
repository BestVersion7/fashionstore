import { getUserInfoByEmail } from "../utils/apiCalls";
import { ProductReviewType, UserType } from "../types";
import { ProductReviewStar } from "./ProductReviewStar";
import { FaCircleUser } from "react-icons/fa6";
import { formatTimeDifference } from "../utils/format";

export const ProductReview = async (props: ProductReviewType) => {
    const user: UserType = await getUserInfoByEmail(props.user_email);

    return (
        <article className=" px-2 border border-gray-400  py-2 ">
            <p className="font-medium flex gap-2 items-center">
                <FaCircleUser className="text-green-600" />
                {user.name}
            </p>

            <div className="flex gap-1 items-center">
                <ProductReviewStar count={1} average={props.review_star} />
            </div>

            <div>
                <p className="italic">
                    Reviewed {formatTimeDifference(props.created_at)}
                </p>
                <p>{props.review_message}</p>
            </div>
        </article>
    );
};
