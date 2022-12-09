import { useContext } from "react";
import {StudiosContext} from "../../../Contexts/studios_all";
import { Router, Route, Link } from "react-router-dom";

const StudiosTable = ({perPage, params}) => {
    const { studios } = useContext(StudiosContext);
    console.log(studios);
    
    return <table>
            <thread>
                <tr>
                    <th> Name </th>
                    <th> Address </th>
                    <th> Postal Code </th>
                    <th> Phone Number </th>
                </tr>
            </thread>

            <tbody>
                {studios.map((studio, index) =>(
                    <tr key={studio.name}>
                        <td> {(params.page - 1) * perPage + index + 1} </td>
                        <Link to={`${studio.name}/details/`}>{studio.name}</Link>
                        <td> {studio.address} </td>
                        <td> {studio.postal_code} </td>
                        <td> {studio.phone_number} </td>
                    </tr>
                ))}
            </tbody>
        </table>
}

export default StudiosTable 