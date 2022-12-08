import React from "react";
import { Sub_context } from "../../../Contexts/Sub_context";
import Text from "../../Text";
import { useEffect, useState, useContext } from "react";
import Sub_object from "./Sub_getter_template";

// component for getting a subscription

const Get_Sub = () => {
    const { subData, setData } = useContext(Sub_context);

   
    const [params, setParams] = useState({
        user_id: 1,  // for now default is 1, see how to set this up correctly using the global context
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwMzc4OTM5LCJpYXQiOjE2NzAyOTI1MzksImp0aSI6IjgxN2JmZjBiYTEwMTRkMjQ5ZDM5NTBkNTFiNmQxOGRkIiwidXNlcl9pZCI6MX0.rkoVPsruqjspMM9fwDdMmJNrpEGDSvVNaYGfACqq4NA',
    });

    const {user_id, token} = params;
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
                "Authorization": `Bearer ${token}`,
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
   return (
        <div>
            <Sub_object></Sub_object>
        </div>
   )
}

export default Get_Sub;