import { useContext } from "react";
import {FilterContext} from "../../../../Contexts/Filter_context";
import "./styles.css";


const FilteredStudioTable = ({perPage, params, listData}) => {
    const { filtered_list } = useContext(FilterContext);
    console.log("filtered", filtered_list);

    if (filtered_list.length === 0 || filtered_list[0].length === 0) {
        return (
            <div className="table-container">
                <table>
                <thead>
                    <tr>
                        <th>   Record #   </th>
                        <th>   Studio   </th>
                        <th>   Adress   </th>
                        <th>   Latitude   </th>
                        <th>   Longitude   </th>
                        <th>   Code   </th>
                        <th>   Phone   </th>
                        <th>   Amenities </th>
                    </tr>   
                </thead>
                </table>
            </div>)
    } else {
        return(
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>   Record #   </th>
                            <th>   Studio   </th>
                            <th>   Adress   </th>
                            <th>   Latitude   </th>
                            <th>   Longitude   </th>
                            <th>   Code   </th>
                            <th>   Phone   </th>
                            <th>   Amenities </th>
                        </tr>   
                    </thead>
                    
                    <tbody>
                    {filtered_list.map((data, index) => (
                        <tr key={data.name}>
                            <td> {(params.page - 1) * perPage + index + 1} </td>
                            <td> {data[index].name} </td>
                            <td> {data[index].address} </td>
                            <td> {data[index].latitude} </td>
                            <td> {data[index].longitude} </td>
                            <td> {data[index].postal_code} </td>
                            <td> {data[index].phone_number} </td>
                            <td> 
                                <ul>{
                                /* map each of the amenity dictionaries to an li element at this cell*/
                                data[index].amenities.map((amenity) => (
                                    <li key={amenity.name}> {amenity.type} : {amenity.quantity} </li>
                                ))
                                } </ul>
                            </td>

                        </tr>
                    ))}
                </tbody>
                </table>
            </div>
        )
    }
}


export default FilteredStudioTable;