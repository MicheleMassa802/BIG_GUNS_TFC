import React, {useEffect, useState} from "react";
import Text from "../../Text";
import Input from "../../Input/input";
import Button from "../../Input/button";
import CreateSubForm from "./create_form";

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

    const [uploadData, setUploadData] = useState({
        related_user: 0,
        sub_type: 0,
        sub_start_date: "",
        payment_card: "",
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
                setData({...data, is_backend: true});
                return true;
            } else {
                // user doesn't have a sub, add is_backend to data and set the data to the sub object
                setData({...data, is_backend: false});
                return false;
            }
        });

    }


    // create get request to backend, then get the response and carry out the corresponding procedure
    useEffect(() => {
        
        // make func call
        Is_subbed();

        // make it so that this runs whenever setData is called
        }, [params, setData]);
    

    function Submit_form(submission) {
        //useEffect(() => {
            // send data to backend to create subscription
            submission.preventDefault();
            console.log("POST ", uploadData);

            // create post request to backend, then get the response and show the user the new subscription
            const {user_id, token} = params;
                // send a request to the API to post the new sub
                const url = `http://localhost:8000/subscriptions/${user_id}/subscription_page/`;
                const config = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify(uploadData),
                };
                fetch(url, config)
                    .then((response) => response.json())
                    .then((data) => {
                        console.log("POST return ", data);
                        setData(data);
                        Is_subbed();
                    })
                    .catch((error) => {
                        alert("oopsie woopsie I fucky wucky uppy THE FUCKING CODE", error)
                    });
        //}, [params, uploadData, setData]);
    }

    // function for storing name
    const handleInput = e => {
        const newData = {...uploadData,
            related_user: params.user_id,
            sub_start_date: new Date().toISOString().slice(0, 10)};
        newData[e.target.name] = e.target.value;
        setUploadData(newData);
        console.log(newData);
    };

    if (data["is_backend"] === true){
        // data coming from backend means user is subbed
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
                <Text> You are not yet subscribed.Subscribe Here! </Text>
                <form onSubmit={Submit_form}>
                    <label> Subscription Type: </label>
                    {/* call respective handling functions*/}
                    <input type="radio" id="monthly" name="sub_type" value="14.99" required onChange={handleInput}/>
                    <label htmlFor="monthly"> Monthly </label>
                    <input type="radio" id="yearly" name="sub_type" value="149.99" onChange={handleInput}/>
                    <label htmlFor="yearly"> Yearly </label>
                    <br></br>
                    <label> Payment Card: </label>
                    <input type="text" name="payment_card" placeholder="Payment Card" required onChange={handleInput}/>
                    <br></br> 
                    <Button label="Submit"/>
                </form>
            </div>
            );
    }
}

export default Sub_Creator;