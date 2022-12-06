import React from "react";
import Text from "../../Text/";
import Button from "../../Input/button";

// component for buttons to be used in forms

class CreateSubForm extends React.Component {
    render(){
        return (
            <div>
                {/* Display the radio button and the text input for sub type and credit card*/} 
                <label> Subscription Type: </label>
                <input type="radio" id="monthly" name="sub_type" value="14.99" required/>
                <label htmlFor="monthly"> Monthly </label>
                <input type="radio" id="yearly" name="sub_type" value="149.99"/>
                <label htmlFor="yearly"> Yearly </label>
                <br></br>
                <label> Payment Card: </label>
                <input type="text" name="payment_card" placeholder="Payment Card" required/>
                <br></br> 
            </div>
        )
    }
}

export default CreateSubForm;