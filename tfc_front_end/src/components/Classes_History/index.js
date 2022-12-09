import { useContext, useEffect, useState } from "react";
import Classes_Hist_Table from "./Classes_Hist_Table";
import {CH_context} from "../../Contexts/CH_context";
// import axios from 'axios';

const ClassesHist = () => {
    const perPage = 15;
    const [params, setParams] = useState({
        page: 1,  // all pages grabbed from API by default
        perPage: perPage,  // api returns 4 by default
        user_id: 1,  // for now default is 1, see how to set this up correctly using the global context
        /*Used my own generated TOKEN FROM postman */
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwNjAyNzkyLCJpYXQiOjE2NzA1MTYzOTIsImp0aSI6ImMwMDI0ZjFiYTUwYjQzZThhZWYxNmFiYTAxZGQ5ZDgxIiwidXNlcl9pZCI6MX0.0x4Va-HVQaUVq72_sGEmvAqHSLKpbgThViM7BSk82eU',
    });

    const { setUserClasses } = useContext(CH_context);

    useEffect(() => {
        const {page, perPage, user_id, token} = params;
        // send a request to the API to get the classesHistory with that url, a header and a body
        const url = `http://localhost:8000/classes/user/${user_id}/`;
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        };
        
        fetch(url, config)
            .then(res => res.json())
            .then(jsonData => {
                // console.log("1", json);
                setUserClasses(jsonData); 
                
            })
    }, [params, setUserClasses]);

    return (
        <>
            <Classes_Hist_Table perPage={perPage} params={params} />
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

export default ClassesHist;