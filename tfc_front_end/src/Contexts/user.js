import { createContext, useState } from "react";

export const useUserContext = () => {
    const [user, setUser] = useState([])

    return {
        user,
        setUser,
    }
}

export const UserContext = createContext(
    {
        user: null,
        setUser: () => {},
    }
);

export default UserContext;