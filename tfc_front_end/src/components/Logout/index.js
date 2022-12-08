import React from "react";

const Logout = () => {

    if (localStorage.getItem('accessToken') === "null"){
        return (
            <div>
                <h1><b>You are logged out.</b></h1>
            </div>
        )
    }
    else{
        localStorage.setItem('accessToken', null)
        return(
            <div> 
                <h1><b>You have been logged out.</b></h1>
            </div>
        )
    }
}

export default Logout;