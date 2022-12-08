import { useContext } from "react";
import {PH_context} from "../../../Contexts/PH_context";
import "./styles.css";


const PaymentHistTable = ({perPage, params}) => {
    const { payment_list } = useContext(PH_context);
    // console.log("payments", payment_list);


    return(
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>   Record #   </th>
                        <th>   User   </th>
                        <th>   Card   </th>
                        <th>   Date   </th>
                        <th>   Amount   </th>
                    </tr>   
                </thead>
                
                <tbody>
                    {payment_list.map((payment, index) => (
                        <tr key={payment.id}>
                            <td> {(params.page - 1) * perPage + index + 1} </td>
                            <td> {payment.related_user} </td>
                            <td> {payment.payment_card} </td>
                            <td> {payment.payment_date} </td>
                            <td> {payment.payment_amount} </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
        
}

export default PaymentHistTable;