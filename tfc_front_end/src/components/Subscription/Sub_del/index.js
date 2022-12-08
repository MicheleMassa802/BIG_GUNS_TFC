import React, {useEffect, useState} from "react";
import Text from "../../Text";
import Button from "../../Input/button";
import { Sub_context } from "../../../Contexts/Sub_context";
import { useContext } from "react";


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
        user_id: 1,  // for now default is 1, see how to set this up correctly using the global context
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwMzc4OTM5LCJpYXQiOjE2NzAyOTI1MzksImp0aSI6IjgxN2JmZjBiYTEwMTRkMjQ5ZDM5NTBkNTFiNmQxOGRkIiwidXNlcl9pZCI6MX0.rkoVPsruqjspMM9fwDdMmJNrpEGDSvVNaYGfACqq4NA',
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
                "Authorization": `Bearer ${token}`,
            }
        };
        fetch(url, config)
        .then((response) => response.json())
        .then((data) => {
            console.log("GET")
            // if the user has a sub, set the data to the sub object and return true
            if (data.message === undefined){
                // user has a sub, add is_backend to data and set the data to the sub object
                localSetData({data, is_backend: true});
                return true;
            } else {
                // user doesn't have a sub, add is_backend to data and set the data to the sub object
                localSetData({data, is_backend: false});
                return false;
            }
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
                        "Authorization": `Bearer ${token}`
                    }
                };

                fetch(url, config)
                // .then((response) => response)
                .then((data) => {
                    const newData = {...local_sub_data};
                    newData["is_backend"] = false;
                    localSetData(newData);
                    console.log("DELETE MSG", data);
                    Is_subbed();
                })
                .catch((error) => {
                    console.log(error);
                });

        //}, [params, uploadData, setData]);
    }

    if (local_sub_data["is_backend"] === false){
        // data coming from backend means user is subbed
        return (
            <div>
                {/* <Text> Subscription Details </Text>
                <Text> User: {sub_data.related_user} </Text>
                <Text> Subscription Type: {sub_data.sub_type} </Text>
                <Text> Subscription Start Date: {sub_data.sub_start_date} </Text>
                <Text> Payment Card: {sub_data.payment_card} </Text> */}
                <p> Cant delete what you dont have </p>
            </div>
                
        );
    } else {
        
        return (
            <div>
                <p> Dont you even think of leaving me you bastard </p>
                <form onSubmit={Submit_delete}>
                    <Button label="Cancel Subscription"/>
                </form>
            </div>
            );
    }
}

export default Delete_sub;