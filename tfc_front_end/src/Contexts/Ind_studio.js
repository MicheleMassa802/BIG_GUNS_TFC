import { createContext, useState } from "react";

export const useIndStudiosContext = () => {
    const [ind_studio, setIndStudios] = useState([])

    return{
        ind_studio,
        setIndStudios,
    }
}

export const IndStudiosContext = createContext(
    {
        ind_studios: null,
        setIndStudios: () => {},
    }
);

export default IndStudiosContext;