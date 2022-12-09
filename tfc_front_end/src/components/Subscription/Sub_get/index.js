import React from "react";
import { Sub_context } from "../../../Contexts/Sub_context";
import Text from "../../Text";
import { useEffect, useState, useContext } from "react";
import Sub_object from "./Sub_getter_template";
import "./styles.css";

// component for getting a subscription

const Get_Sub = () => {
    const { subData, setData } = useContext(Sub_context);

   
    const [params, setParams] = useState({
        user_id: localStorage.getItem('user_id'),  // for now default is 1, see how to set this up correctly using the global context
        token: localStorage.getItem('accessToken'),
    });

    const {user_id, token} = params;
    console.log(user_id)
    //console.log("First data", subData);

    // create get request to backend, then get the response and carry out the corresponding procedure
    useEffect(() => { 
        // make get call
        // send a request to the API to post the new sub
        const url = `http://localhost:8000/subscriptions/${user_id}/subscription_page/`;
        const config = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `${token}`,
            }
        };
        fetch(url, config)
        .then((response) => response.json())
        .then((data) => {
            //console.log("GET")
            const newData = {...subData, data};
            //console.log("newData", newData.data);
            // if the user has a sub, set the data to the sub object and return true
            if (newData.message === undefined){
                // user has a sub, add is_backend to data and set the data to the sub object
                setData({...newData.data, is_backend: true});
                // return true;
            } else {
                // user doesn't have a sub, add is_backend to data and set the data to the sub object
                setData({...newData.data, is_backend: false});
                // return false;
            }
        });


    // make it so that this runs whenever setData is called
    }, [params, setData]);

    // if subData is set, then return the data
    if (params['token'] === 'null'){
        return <div className="outer-container">
            <p>You are not logged in. Please log in to access this page.</p>
        </div>

    } else {
        return (
            <div className="container">
                <Sub_object></Sub_object>
            </div>
    )
    }
}

export default Get_Sub;