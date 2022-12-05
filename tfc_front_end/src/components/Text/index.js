import React from "react";

// component for displaying titles/short burst of information (code pretty much resembling lecture code for w10)

class Text extends React.Component {
    render(){
        const { text } = this.props;
        return <h1>{text}<br/></h1>
    }
}

export default Text;