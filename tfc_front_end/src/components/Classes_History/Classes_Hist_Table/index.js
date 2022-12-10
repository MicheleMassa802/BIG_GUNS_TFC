import { useContext } from "react";
import {CH_context} from "../../../Contexts/CH_context";
import "./styles.css";

const ClassesHistTable = ({perPage, params}) => {
    const { userClass_list } = useContext(CH_context);
    console.log("User Classes List: ", userClass_list);


    return (
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>   Record #   </th>
                        <th>   Studio   </th>
                        <th>   Class Name   </th>
                        <th>   Class Description   </th>
                        <th>   Coach   </th>
                        <th>   Keywords  </th>
                        <th>   Capacity   </th>
                        <th>   Start Time  </th>
                        <th>   End Time  </th>
                    </tr>   
                </thead>
                
                <tbody>
                    {userClass_list.map((userClass, index) => (
                        <tr key={userClass.id}>
                            <td> {(params.page - 1) * perPage + index + 1} </td>

                            <td> {userClass.studio} </td>
                            <td> {userClass.name} </td>
                            <td> {userClass.description} </td>
                            <td> {userClass.coach} </td>

                            <td> {userClass.keywords} </td>
                            <td> {userClass.capacity} </td>
                            <td> {userClass.start_time} </td>
                            <td> {userClass.end_time} </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
        
}

export default ClassesHistTable;