import { createContext, useState } from "react";

export const useSubContext = () => {
    const [subData, setData] = useState([]);

    return {
        subData,
        setData,
    }
}

export const Sub_context = createContext(
{
    subData:{
        related_user: "",
        sub_type: "",
        sub_start_date: "",
        payment_card: "",
        is_backend: false,
        },

    setData: () => {},
}
);

export default Sub_context;