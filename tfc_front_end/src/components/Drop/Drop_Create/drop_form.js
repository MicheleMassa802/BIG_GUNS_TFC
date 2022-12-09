import React from "react";
import Text from "../../Text";
import Button from "../../Input/button";

// component for buttons to be used in forms

class CreateDropForm extends React.Component {
    render(){
        return (
            <div>
                {/* Display the radio button for modify future enroll and the drop down menu with all classes*/} 
                <label> Drop from future classes? </label>
                <input type="radio" id="modify_future_classes" name="modify_future_classes" value="Yes"/>
                <label htmlFor="modify_future_classes"> Yes </label>
                <input type="radio" id="modify_future_classes" name="modify_future_classes" value="No"/>
                <label htmlFor="modify_future_classes"> No </label>
                <br></br>
                <label> Class to drop from:  </label>
                <input type="text" name="drop_class" placeholder="Class ID (Should be dropdown which when selected displays name but gives ID))" required/>
                <br></br> 
            </div>
        )
    }
}

export default CreateDropForm;