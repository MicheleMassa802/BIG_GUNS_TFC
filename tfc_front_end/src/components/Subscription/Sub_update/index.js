import React, {useEffect, useState} from "react";
import Text from "../../Text";
import Button from "../../Input/button";
import { Sub_context } from "../../../Contexts/Sub_context";
import { useContext } from "react";


// get the data from the user and send it to the backend to create as subscription

// works as a get and post for the subscription page (might want to separete this into two components)

// desired behaviour is to not need to ask for who the user is as they should only be able to subscribe
// for the logged in user and starting today, so we take care of those fields automatically

const Update_Sub = () => {
    // user input stored here as state as its not needed anywhere else in a context
    const [local_sub_data, localSetData] = useState({
        related_user: "",
        sub_type: "",
        sub_start_date: "",
        payment_card: "",
        is_backend: false,
    });

    const { subData, setData} = useContext(Sub_context);

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
                // user has a sub, add is_backend to data and set the data to the sub object
                localSetData({...data, is_backend: true});
                return true;
            } else {
                // user doesn't have a sub, add is_backend to data and set the data to the sub object
                localSetData({...data, is_backend: false});
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
    

    function Submit_form(submission) {
        //useEffect(() => {
            // send data to backend to create subscription
            submission.preventDefault();

            // create post request to backend, then get the response and show the user the new subscription
            const {user_id, token} = params;
                // send a request to the API to post the new sub
                const url = `http://localhost:8000/subscriptions/${user_id}/subscription_page/`;
                const config = {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `${token}`,
                    },
                    body: JSON.stringify(local_sub_data),
                };
                fetch(url, config)
                    .then((response) => response.json())
                    .then((data) => {
                        console.log("PUT return ", data);
                        localSetData(data);
                        setData(data);
                        Is_subbed();
                    })
                    .catch((error) => {
                        console.log(error)
                        
                    });
        //}, [params, uploadData, setData]);
    }

    // function for storing name
    const handleInput = e => {
        const newData = {...local_sub_data};
        newData[e.target.name] = e.target.value;
        localSetData(newData);
        console.log(newData);

        if (e.target.name === "sub_type"){
            setSelected(e.target.value);
        }
    };

    const [selected, setSelected] = useState();
    useEffect(() => {
        if (local_sub_data.length > 0) {
            setSelected(local_sub_data.sub_type.toString());
        }
    }, [local_sub_data.sub_type]);
    

    console.log("selected ", selected);
    
    if (local_sub_data["is_backend"] === false){
        // data coming from backend means user is subbed
        return (
            <div>
                {/* <Text> Subscription Details </Text>
                <Text> User: {sub_data.related_user} </Text>
                <Text> Subscription Type: {sub_data.sub_type} </Text>
                <Text> Subscription Start Date: {sub_data.sub_start_date} </Text>
                <Text> Payment Card: {sub_data.payment_card} </Text> */}
                <p> You are not subscribed you silly goose :0 </p>
            </div>
                
        );
    } else {
        
        return (
            <div>
                <p> Whatcha wanna update today cunt? </p>
                <form onSubmit={Submit_form}>
                    <label> Subscription Type: </label>
                    {/* call respective handling functions*/}
                    <input type="radio" id="monthly" name="sub_type" value="14.99"
                     required onChange={handleInput} checked={selected==="14.99"}/>
                    <label htmlFor="monthly"> Monthly </label>
                    <input type="radio" id="yearly" name="sub_type" value="149.99"
                     onChange={handleInput} checked={selected==="149.99"}/>
                    <label htmlFor="yearly"> Yearly </label>
                    <br></br>
                    <label> Payment Card: </label>
                    <input type="text" name="payment_card" value={local_sub_data.payment_card} required onChange={handleInput}/>
                    <br></br> 
                    <Button label="Submit"/>
                </form>
            </div>
            );
    }
}

export default Update_Sub;