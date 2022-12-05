import { useContext, useEffect, useState } from "react";
import PaymentHistTable from "./Payment_Hist_Table";
import {PH_context} from "../../Contexts/PH_context";
// import axios from 'axios';

const PaymentHist = () => {
    const perPage = 15;
    const [params, setParams] = useState({
        page: 1,  // all pages grabbed from API by default
        perPage: perPage,  // api returns 4 by default
        user_id: 1,  // for now default is 1, see how to set this up correctly using the global context
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwMjE5MjQ4LCJpYXQiOjE2NzAxMzI4NDgsImp0aSI6Ijk3OTAxMWE5YTZhNDQ5NjQ4ZjkyNmFiYTc1NDc1MzM1IiwidXNlcl9pZCI6MX0.hNPDXaHo7noxzW5j67UpnVX0y7aXRIcaJLVrErVXY64',
    });

    const { setPayments } = useContext(PH_context);

    useEffect(() => {
        const {page, perPage, user_id, token} = params;
        // send a request to the API to get the payments with that url, a header and a body
        const url = `http://localhost:8000/subscriptions/${user_id}/payment_history/`;
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