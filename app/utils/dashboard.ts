import { ProductType } from "../types";

type action = {
    type: "change_input";
    payload: {
        key: string;
        value: string;
    };
};

export function productReducer(state: ProductType, action: action) {
    switch (action.type) {
        case "change_input":
            return { ...state, [action.payload.key]: action.payload.value };

        default:
            throw new Error("incorrect type");
    }
}
