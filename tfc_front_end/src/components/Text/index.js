import React from "react";

// component for displaying titles/short burst of information (code pretty much resembling lecture code for w10)

class Text extends React.Component {
    render(){
        return <h1>{this.props.children}</h1>
    }
}

export default Text;