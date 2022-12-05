import React, {useEffect, useState} from "react";
import Input from "../Input";
import Text from "../Text";
import {Input, B} from "../Input";

// get the data from the user and send it to the backend to create as subscription

// works as a get and post for the subscription page (might want to separete this into two components)

// desired behaviour is to not need to ask for who the user is as they should only be able to subscribe
// for the logged in user and starting today, so we take care of those fields automatically

const Sub_Creator = () => {
    // user input stored here as state as its not needed anywhere else in a context
    const [data, setData] = useState({
        related_user: "",
        sub_type: "",
        sub_start_date: "",
        payment_card: "",
        is_backend: false,
    });

    // set related_user to the logged in user and sub_start_date to today's date
    useEffect(() => {
        setData({...data, related_user: 1,
            sub_start_date: new Date().toISOString().slice(0, 10)});
            // 1 by default, use context when available
    }, []);

    const [params, setParams] = useState({
        user_id: 1,  // for now default is 1, see how to set this up correctly using the global context
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwMjE5MjQ4LCJpYXQiOjE2NzAxMzI4NDgsImp0aSI6Ijk3OTAxMWE5YTZhNDQ5NjQ4ZjkyNmFiYTc1NDc1MzM1IiwidXNlcl9pZCI6MX0.hNPDXaHo7noxzW5j67UpnVX0y7aXRIcaJLVrErVXY64',
    });

    // make a get request to get the user's sub object if it exists, return true and set the data to the sub object
    // if it doesn't exist, return false
    function is_subbed(){
        // create get request to backend, then get the response and carry out the corresponding procedure
        useEffect(() => {
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
                    console.log(data);

                    // if the user has a sub, set the data to the sub object and return true
                    if (data.message !== undefined){
                        // user has a sub, add is_backend to data and set the data to the sub object
                        setData({...data, is_backend: true});
                        return true;
                    } else {
                        // user doesn't have a sub, add is_backend to data and set the data to the sub object
                        setData({...data, is_backend: false});
                        return false;
                    }
        }, [params, setData]);
    });
    }

    function submit_form(submission) {
        // send data to backend to create subscription
        submission.preventDefault();
        console.log(data);

        // create post request to backend, then get the response and show the user the new subscription
        useEffect(() => {
            const {user_id, token} = params;
            // send a request to the API to post the new sub
            const url = `http://localhost:8000/subscriptions/${user_id}/subscription_page/`;
            const config = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                }
            };
            fetch(url, config)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setData(data);

        }, [params, setData]);
    });
    }

    function handle_input(e) {
        // set the state to the value of the input field based on the name of the input field
        const data = {...data};
        data[e.target.name] = e.target.value;
        setData(data);
        console.log(data);
    }

    if (is_subbed()) {
        return (
            <div>
                <Text> Subscription Details </Text>
                <Text> User: {data.related_user} </Text>
                <Text> Subscription Type: {data.sub_type} </Text>
                <Text> Subscription Start Date: {data.sub_start_date} </Text>
                <Text> Payment Card: {data.payment_card} </Text>
            </div>
                
        );
    } else {
        return (
            <div>
                <Text> You are not yet subscribed. Subscribe Here! </Text>
                <form onSubmit={(sub) => handle_submit(sub)}>
                    {/* Display the radio button and the text input for sub type and credit card*/} 
                    <Text> Subscription Type </Text>
                    <input type="radio" id="monthly" name="sub_type" value="14.99" onChange={(e) => handle_input(e)}/>
                    <label for="monthly"> Monthly </label>
                    <input type="radio" id="yearly" name="sub_type" value="149.99" onChange={(e) => handle_input(e)}/>
                    <label for="yearly"> Yearly </label>

                    <input type="text" name="payment_card" placeholder="Payment Card" onChange={(e) => handle_input(e)}/>

                    <Button label="Subscribe"/>
                </form>
            </div>
            );
    }
}

export default Sub_Creator;