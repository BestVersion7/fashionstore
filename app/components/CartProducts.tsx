import { CartQChange } from "./CartQChange";
import { CartType } from "../types";
import { getProductById } from "../utils/apiCalls";
import { formatCurrency } from "../utils/formatCurrency";

export const CartProducts = async (props: CartType) => {
    const findProductInfo = async () => {
        try {
            const productData = await getProductById(props.product_id);
            const { name, description } = productData;

            return { name, description };
        } catch (err) {
            console.log("server error");
        }
    };
    const productInfo = await findProductInfo();

    return (
        <tr className="border border-l-purple-500 bg-blue-200">
            <td>{productInfo?.name}</td>
            <td>{productInfo?.description}</td>
            <td>{formatCurrency(Number(props.product_price))}</td>
            <td>
                <CartQChange {...props} />
            </td>
            <td>
                {formatCurrency(
                    Number(props.quantity) * Number(props.product_price)
                )}
            </td>
        </tr>
    );
};
