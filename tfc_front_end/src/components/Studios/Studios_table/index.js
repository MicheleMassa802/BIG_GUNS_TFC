import { useContext } from "react";
import {StudiosContext} from "../../../Contexts/studios_all";
import { Router, Route, Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import './style.css'

const StudiosTable = ({perPage, params}) => {
    const { studios } = useContext(StudiosContext);


    return <table>
            <thead>
                <tr>
                    <th> Name </th>
                    <th> Address </th>
                    <th> Postal Code </th>
                    <th> Phone Number </th>
                </tr>   
            </thead>
            
            <tbody>
            {studios.map((studio, index) =>(
                    <tr key={studio.name}>
                        {/* <td> {(params.page - 1) * perPage + index + 1} </td> */}
                        <Link to={`/details/${studio.name}`}>{studio.name}</Link>
                        {/* <td onClick={() => handleRowClick(row)}> {studio.name} </td> */}
                        <td> {studio.address} </td>
                        <td> {studio.postal_code} </td>
                        <td> {studio.phone_number} </td>
                    </tr>
                ))}
            </tbody>
        </table>

        
}

export default StudiosTable