import { useContext } from "react";
import {FilterContext} from "../../../../Contexts/Filter_context";
import "./styles.css";


const FilteredClassTable = ({perPage, params, listData}) => {
    const { filtered_list } = useContext(FilterContext);
    console.log("filtered", filtered_list);

    return(
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>   Record #   </th>
                        <th>   Class   </th>
                        <th>   Description   </th>
                        <th>   Coach   </th>
                        <th>   Studio   </th>
                        <th>   Date   </th>
                        <th>   Initial Time   </th>
                        <th>   Ending Time   </th>
                    </tr>   
                </thead>
                
                <tbody>
                {filtered_list.map((data, index) => (
                    <tr key={data.name}>
                        <td> {(params.page - 1) * perPage + index + 1} </td>
                        <td> {data.name} </td>
                        <td> {data.description} </td>
                        <td> {data.coach} </td>
                        <td> {data.studio} </td>
                        <td> {data.date} </td>
                        <td> {data.initial_time} </td>
                        <td> {data.ending_time} </td>
                    </tr>
                ))}
            </tbody>
            </table>
        </div>
    )
}


export default FilteredClassTable;