import { useContext, useEffect, useState } from "react";
import Classes_Hist_Table from "./Classes_Hist_Table";
import {CH_context} from "../../Contexts/CH_context";
import Text from "../Text";
// import axios from 'axios';

const ClassesHist = () => {
    const perPage = 15;
    const [params, setParams] = useState({
        page: 1,  // all pages grabbed from API by default
        perPage: perPage,  // api returns 4 by default
        user_id: localStorage.getItem("user_id"),  
        token: localStorage.getItem("accessToken")
    });

    const { setUserClasses } = useContext(CH_context);

    useEffect(() => {
        //const {page, perPage, user_id, token} = params;
        // send a request to the API to get the classesHistory with that url, a header and a body
        const url = `http://localhost:8000/classes/user/${params.user_id}/`;
        const config = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${params.token}`,
            }
        };
        
        fetch(url, config)
            .then(res => res.json())
            .then(jsonData => {
                // console.log("1", json);
                setUserClasses(jsonData); 
                
            })
    }, [params, setUserClasses]);

    if (params.token != 'null'){
        return (
            <div className="outer-container">
                <Classes_Hist_Table perPage={perPage} params={params} />
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
    else{
        return (<Text> You are not subscribed. Please subscribe to enroll in classes!</Text>);
    }
}

export default ClassesHist;