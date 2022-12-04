import { createContext, useState } from "react";

export const usePHContext = () => {
    const [payment_list, setPayments] = useState([]);

    return {
        payment_list,
        setPayments,
    }
}

export const PH_context = createContext(
{
    payment_list: null,
    setPayments: () => {},
}
);



export default PH_context;