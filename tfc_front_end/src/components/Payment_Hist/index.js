import { useContext, useEffect, useState } from "react";
import PaymentHistTable from "./Payment_Hist_Table";
import {PH_context} from "../../Contexts/PH_context";
// import axios from 'axios';

const PaymentHist = () => {
    const perPage = 1;
    const [params, setParams] = useState({
        page: 1,  // all pages grabbed from API by default
        perPage: perPage,  // api returns 4 by default
        user_id: 1,  // for now default is 1, see how to set this up correctly using the global context
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwNjAzNjA3LCJpYXQiOjE2NzA1MTcyMDcsImp0aSI6ImExMjZkYzVhNmRhYjQ1NzdiOWJjZTNjYmJlNWFjOTllIiwidXNlcl9pZCI6MX0.NX_KJ80lT0ic9KbvWMpZwfWCrah4_X2tIcTvkp6y8So',
    });

    const { setPayments } = useContext(PH_context);

    useEffect(() => {
        const {page, perPage, user_id, token} = params;
        // send a request to the API to get the payments with that url, a header and a body
        const url = `http://localhost:8000/subscriptions/${user_id}/payment_history/?page=${page}&per_page=${perPage}`;
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
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
        <>
            <PaymentHistTable perPage={perPage} params={params} />
            <button onClick={() => setParams({
                ...params,
                page: Math.max(1, params.page - 1)})}> prev 
            </button>
            <button onClick={() => setParams({
                ...params,
                page: params.page + 1})}> next
            </button>
        </>
    )
}

export default PaymentHist;