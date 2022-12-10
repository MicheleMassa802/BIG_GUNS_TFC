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
                        <th>   Studio   </th>
                        <th>   Adress   </th>
                        <th>   Latitued   </th>
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
                        <td> {data.name} </td>
                        <td> {data.address} </td>
                        <td> {data.latitude} </td>
                        <td> {data.longitude} </td>
                        <td> {data.postal_code} </td>
                        <td> {data.phone_number} </td>
                        <td> <ul>{
                        /* map each of the amenity dictionaries to an li element at this cell*/
                        data.amenities.map((amenity) => (
                            <li key={amenity.name}> {amenity.type} : {amenity.quantity} </li>
                        ))
                        } </ul> </td>

                    </tr>
                ))}
            </tbody>
            </table>
        </div>
    )
}


export default FilteredClassTable;