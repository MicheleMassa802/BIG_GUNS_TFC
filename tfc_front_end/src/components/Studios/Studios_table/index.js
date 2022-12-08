import { useContext } from "react";
import {StudiosContext} from "../../../Contexts/studios_all";

const StudiosTable = ({perPage, params}) => {
    const { studios_list } = useContext(StudiosContext);
    return (
        <table>
            <thread>
                <tr>
                    <th> Name </th>
                    <th> Address </th>
                    <th> Postal Code </th>
                    <th> Phone Number </th>
                </tr>
            </thread>

            <tbody>
                {studios_list.map((studio, index) =>(
                    <tr key={studio.id}>
                        <td> {(params.page - 1) * perPage + index + 1} </td>
                        <td> {studio.name} </td>
                        <td> {studio.address} </td>
                        <td> {studio.postal_code} </td>
                        <td> {studio.phone_number} </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default StudiosTable 