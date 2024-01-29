"use client";

import { getUserInfoByEmail } from "../../utils/apiCalls";
import { ProductReviewType, UserType } from "../../types";
import { ProductReviewStar } from "./ProductReviewStar";
import { FaCircleUser } from "react-icons/fa6";
import { formatTimeDifference } from "../../utils/format";
import { useEffect, useState } from "react";

export const ProductReviewComments = (props: ProductReviewType) => {
    const [user, setUser] = useState<UserType>();

    useEffect(() => {
        async function getUser() {
            const data = await getUserInfoByEmail(props.user_email);
            setUser(data);
        }
        getUser();
    }, []);

    return (
        <article className=" px-2 border border-gray-400  py-2 ">
            <p className="font-medium flex gap-2 items-center">
                <FaCircleUser className="text-green-600" />
                {user?.name}
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
