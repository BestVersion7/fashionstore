"use client";
import { useRouter, useSearchParams } from "next/navigation";

export const Pagination = (props: { page: number }) => {
    const router = useRouter();
    let page: (number | string)[] = [];
    const params = useSearchParams();
    const pageParam = params.get("page") || 1;
    const queryParam = params.get("q");

    const ceiling = Math.ceil(props.page / 24) + 1;
    for (let i = 1; i < ceiling; i++) {
        page.push(i);
    }

    let pageButtons: (number | string)[] = [];
    // 1,2,4
    if (ceiling > 4) {
        pageButtons = [1, 2, "...", ceiling - 1];
    } else {
        pageButtons = page;
    }

    const handlePagination = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (e.currentTarget.value === "...") {
            return;
        } else if (queryParam) {
            router.push(`?q=${queryParam}&page=${e.currentTarget.value}`);
        } else {
            router.push(`?page=${e.currentTarget.value}`);
        }
    };

    return (
        <div className="text-2xl flex gap-2 items-center py-1">
            Page:
            {Number(pageParam) > 1 && (
                <button
                    className="px-2 py-1 border border-gray-200 bg-white hover:bg-gray-200"
                    onClick={handlePagination}
                    value={Number(pageParam) - 1}
                    type="button"
                >
                    Prev
                </button>
            )}
            {pageButtons.map((item) => (
                <button
                    className={`${
                        item == Number(pageParam) ? "bg-gray-300" : "bg-white"
                    } px-2 py-1 border border-gray-200 hover:bg-gray-200`}
                    onClick={handlePagination}
                    value={item}
                    type="button"
                    key={item}
                >
                    {item}
                </button>
            ))}
            {Number(pageParam) < ceiling - 1 && (
                <button
                    className="px-2 py-1 border border-gray-200 bg-white hover:bg-gray-200"
                    onClick={handlePagination}
                    value={Number(pageParam) + 1}
                    type="button"
                >
                    Next
                </button>
            )}
        </div>
    );
};
