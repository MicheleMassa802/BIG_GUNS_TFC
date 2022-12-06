import React from "react";
import Text from "../Text";

// component for input fields to be used in forms (code pretty much resembling lecture code for w10)

class Input extends React.Component {
    render(){
        const { label, type, value, errors, onChange} = this.props;
        return (
            <>
                <Text>{ label }</Text>
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                />
                {/* display errors under the input field */}
                {<Text>{errors}</Text>}
            </>
        )
    }
}

export default Input;