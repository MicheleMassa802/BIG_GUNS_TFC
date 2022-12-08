import { createContext, useState } from "react";

export const useStudiosContext = () => {
    const [studios, setStudios] = useState([])

    return{
        studios,
        setStudios,
    }
}

export const StudiosContext = createContext(
    {
        studios: null,
        setStudios: () => {},
    }
);

export default StudiosContext;