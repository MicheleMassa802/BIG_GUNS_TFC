import React from "react";

// component for buttons to be used in forms

class Button extends React.Component {
    render(){
        return (
            <button> {this.props.label} </button>
        )
    }
}

export default Button;