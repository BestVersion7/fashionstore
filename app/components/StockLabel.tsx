export const StockLabel = ({ quantity }: { quantity: number }) => {
    let label;
    let bgColour;

    if (quantity === 0) {
        label = "Temporarily out of stock.";
        bgColour = "bg-orange-500";
    }
    // else if (quantity < 10) {
    //     label = "Almost.";
    //     bgColour = "bg-yellow-500 bg-opacity-50";
    // }
    return (
        <>
            {label && (
                <div
                    className={`text-xl text-center py-1 ${bgColour} text-white font-medium tracking-wider`}
                >
                    {label}
                </div>
            )}
        </>
    );
};
