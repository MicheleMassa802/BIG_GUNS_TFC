import React from "react";
import "./styles.css"

// component for displaying titles/short burst of information (code pretty much resembling lecture code for w10)

class Text extends React.Component {
    render(){
        return (
        <div className="container">
            <h1>{this.props.children}</h1>
        </div>
        )
    }
}

export default Text;