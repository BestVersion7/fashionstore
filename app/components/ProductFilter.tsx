"use client";

export const ProductFilter = () => {
    const handleChangeCategory = () => {};
    return (
        <select
            className="bg-yellow-100 border-2 py-1 px-2 border-black hover:cursor-pointer "
            title="changeQ"
            onChange={handleChangeCategory}
            name="quantity"
            id="quantity"
        >
            {["tops, dresses"].map((item) => (
                <option key={item} value={item}>
                    {item}
                </option>
            ))}
        </select>
    );
};
