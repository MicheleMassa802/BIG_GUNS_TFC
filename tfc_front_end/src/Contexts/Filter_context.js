import { createContext, useState } from "react";

export const useFilterContext = () => {
    const [filtered_list, setList] = useState([]);

    return {
        filtered_list,
        setList,
    }
}

export const FilterContext = createContext(
{
    filtered_list: null,
    setList: () => {},
}
);



export default FilterContext;