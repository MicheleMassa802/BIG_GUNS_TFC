import { useContext } from "react";
import {Sub_context} from "../../../../Contexts/Sub_context";
// import Text component from components folder
import Text from "../../../Text";
import "./styles.css";

const Sub_object = () => {
    const { subData } = useContext(Sub_context);
    console.log("subData", subData);

    if (subData.length === 0){
        return (
            <div className="container">
                Wait a moment...
            </div>
        );
    } else if (subData["message"] != undefined || subData["is_backend"] === false){
        return (
            <div className="container">
                <Text> Subscription Details </Text>
                <p> You must be subscribed in order to view your subscription details.</p>
                <p> What are you waiting for to join the club?</p>
            </div>
        );
    } else {
        return (
            <div className="container">
                <Text> Subscription Details </Text>
                <div className="sub_details">
                    <p> User: {subData.related_user} </p>
                    <p> Subscription Type: {subData.sub_type} </p>
                    <p> Subscription Start Date: {subData.sub_start_date} </p>
                    <p> Payment Card: {subData.payment_card} </p>
                </div>
            </div>
        );

    }
}

export default Sub_object;