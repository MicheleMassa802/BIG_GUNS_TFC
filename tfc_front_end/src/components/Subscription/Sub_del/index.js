import React, {useEffect, useState} from "react";
import Text from "../../Text";
import Button from "../../Input/button";
import { Sub_context } from "../../../Contexts/Sub_context";
import { useContext } from "react";
import "./styles.css";


// get the data from the user and send it to the backend to create as subscription

// works as a get and post for the subscription page (might want to separete this into two components)

// desired behaviour is to not need to ask for who the user is as they should only be able to subscribe
// for the logged in user and starting today, so we take care of those fields automatically

const Delete_sub = () => {

    // const { subData, setData} = useContext(Sub_context);

    // user input stored here as state as its not needed anywhere else in a context
    const [local_sub_data, localSetData] = useState({
        related_user: "",
        sub_type: "",
        sub_start_date: "",
        payment_card: "",
        is_backend: false,
    });

    const [params, setParams] = useState({
        user_id: localStorage.getItem('user_id'),  // for now default is 1, see how to set this up correctly using the global context
        token: localStorage.getItem('accessToken'),
    });

    // make a get request to get the user's sub object if it exists, return true and set the data to the sub object
    // if it doesn't exist, return false
    function Is_subbed(){
        const {user_id, token} = params;
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
            console.log("GET")
            // if the user has a sub, set the data to the sub object and return true
            if (data.message === undefined){
                console.log("sub")
                // user has a sub, add is_backend to data and set the data to the sub object
                localSetData({data, is_backend: true});
                return true;
            } else {
                console.log("no sub")
                // user doesn't have a sub, add is_backend to data and set the data to the sub object
                localSetData({is_backend: false});
                return false;
            }
        })
        .catch((error) => {
            const newData = {...local_sub_data};
            newData["is_backend"] = false;
            localSetData(newData);
            console.log(newData, error);
    });

    }


    // create get request to backend, then get the response and carry out the corresponding procedure
    useEffect(() => {
        
        // make func call
        Is_subbed();

        // make it so that this runs whenever setData is called
        }, [params, localSetData]);
    

    function Submit_delete(submission) {
        //useEffect(() => {
            // send data to backend to create subscription
            submission.preventDefault();

            // create post request to backend, then get the response and show the user the new subscription
            const {user_id, token} = params;
                // send a request to the API to post the new sub
                const url = `http://localhost:8000/subscriptions/${user_id}/subscription_page/`;
                const config = {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `${token}`
                    }
                };

                fetch(url, config)
                .then((response) => response)
                .then((data) => {
                    localSetData({"is_backend": false});
            
                    console.log("DELETE MSG", data);
                })
                .catch((error) => {
                    const newData = {...local_sub_data};
                    newData["is_backend"] = false;
                    localSetData(newData);
                    console.log(error);
                });

        //}, [params, uploadData, setData]);
    }

    if (params['token'] === 'null'){
        return <div className="outer-container">
            <p>You are not logged in. Please log in to access this page.</p>
        </div>

    } else if (local_sub_data["is_backend"] === false){
        // data coming from backend means user is subbed
        return (
            <div className="container">
                {/* <Text> Subscription Details </Text>
                <Text> User: {sub_data.related_user} </Text>
                <Text> Subscription Type: {sub_data.sub_type} </Text>
                <Text> Subscription Start Date: {sub_data.sub_start_date} </Text>
                <Text> Payment Card: {sub_data.payment_card} </Text> */}
                <p> You must be subscribed in order to cancel a subscription.</p>
                <p> What are you waiting for to join the club?</p>
            </div>
                
        );
    } else {
        
        return (
            <div className="container">
                <p> Do you wish to cancel your subscription? </p>
                <p> Keep in mind, this will immediately cancel your active membership for the current subscription period   </p>
                <p> Your current classes will be cancelled, and only re-instated upon re-subscription.</p>
                <form onSubmit={Submit_delete}>
                    <Button label="Cancel Subscription"/>
                </form>
            </div>
            );
    }
}

export default Delete_sub;