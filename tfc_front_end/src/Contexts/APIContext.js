import { createContext, useState } from "react";

export const useAPIContext = () => {
    const [payment_list, setPayments] = useState([]);

    return {
        payment_list,
        setPayments,
    }
}

export const APIContext = createContext(
{
    payment: null,
    setPayments: () => {},
}
);



export default APIContext;