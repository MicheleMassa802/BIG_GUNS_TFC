import { createContext, useState } from "react";

export const useCHContext = () => {
    const [userClass_list, setUserClasses] = useState([]);

    return {
        userClass_list,
        setUserClasses,
    }
}

export const CH_context = createContext(
{
    userClass_list: null,
    setUserClasses: () => {},
}
);



export default CH_context;