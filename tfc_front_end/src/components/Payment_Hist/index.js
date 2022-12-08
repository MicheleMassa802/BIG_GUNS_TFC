import { useContext, useEffect, useState } from "react";
import PaymentHistTable from "./Payment_Hist_Table";
import {PH_context} from "../../Contexts/PH_context";
import "./styles.css";
// import axios from 'axios';

const PaymentHist = () => {
    const perPage = 8;
    const [params, setParams] = useState({
        page: 1,  // all pages grabbed from API by default
        perPage: perPage,  // api returns 8 by default
        user_id: localStorage.getItem('user_id'),
        token: localStorage.getItem('accessToken'),
    });

    const { setPayments } = useContext(PH_context);

    useEffect(() => {
        const {page, perPage, user_id, token} = params;
        // send a request to the API to get the payments with that url, a header and a body
        const url = `http://localhost:8000/subscriptions/${user_id}/payment_history/?page=${page}`;
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`,
            }
        };
        
        fetch(url, config)
            .then(res => res.json())
            .then(json => {
                //console.log("1", json['results']);
                setPayments(json['results']); 
                
            })
    }, [params, setPayments]);

    return (
        <div className="outer-container">
            <PaymentHistTable perPage={perPage} params={params} />
            <div className="buttons">
                <button onClick={() => setParams({
                    ...params,
                    page: Math.max(1, params.page - 1)})}> prev 
                </button>
                <button onClick={() => setParams({
                    ...params,
                    page: params.page + 1})}> next
                </button>
            </div>
        </div>
    )
}

export default PaymentHist;