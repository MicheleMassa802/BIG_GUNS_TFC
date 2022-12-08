import { useContext } from "react";
import {Sub_context} from "../../../../Contexts/Sub_context";
// import Text component from components folder
import Text from "../../../Text";


const Sub_object = () => {
    const { subData } = useContext(Sub_context);
    //console.log("subData", subData);

    if (subData.length === 0){
        return (
            <div>
                Wait a moment...
            </div>
        );
    } else if (subData["message"] != undefined || subData["is_backend"] === false){
        return (
            <div>
                <Text> Subscription Details: </Text>
                <p> You are not yet subscribed. Go subscribe! </p>
            </div>
        );
    } else {
        return (
            <div>
                <Text> Subscription Details </Text>
                <p> User: {subData.related_user} </p>
                <p> Subscription Type: {subData.sub_type} </p>
                <p> Subscription Start Date: {subData.sub_start_date} </p>
                <p> Payment Card: {subData.payment_card} </p>
            </div>
        );

    }
}

export default Sub_object;