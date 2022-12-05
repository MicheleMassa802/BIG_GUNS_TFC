import React from "react";

// component for buttons to be used in forms

class Input extends React.Component {
    render(){
        const { label } = this.props;
        return (
            <>
                <button type="submit">{ label }</button>
            </>
        )
    }
}

export default Button;