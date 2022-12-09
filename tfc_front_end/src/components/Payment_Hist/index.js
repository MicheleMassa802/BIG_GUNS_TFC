import { useContext, useEffect, useState } from "react";
import PaymentHistTable from "./Payment_Hist_Table";
import {PH_context} from "../../Contexts/PH_context";
import "./styles.css";
// import axios from 'axios';

const PaymentHist = () => {
    const perPage = localStorage.getItem('perPage');
    const [params, setParams] = useState({
        page: 1,  // starts off as 1
        perPage: perPage,  // api returns 8 by default
        user_id: localStorage.getItem('user_id'),
        token: localStorage.getItem('accessToken'),
    });

    const [next, setNext] = useState(null);

    const { payment_list, setPayments } = useContext(PH_context);

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
                // console.log("1", json);
                setPayments(json['results']);
                setNext(json['next']);
            })
    }, [params, setPayments]);

    // console.log("payment_list", payment_list, payment_list.length)
    // console.log("params", params)
    if (params['token'] === 'null'){
        return <div className="outer-container">
            <p>You are not logged in. Please log in to access this page.</p>
        </div>

    } else if (payment_list.length == 0 || payment_list[0].related_user === null) {
        return <div className="outer-container">
            <p>You have no payments registered to your name</p>
        </div>
    } else {
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
                        page: next === null ? params.page : params.page + 1})}> next
                    </button>
                </div>
            </div>
        )
    }
}

export default PaymentHist;