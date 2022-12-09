import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Logout = () => {
    let navigate = useNavigate()
    localStorage.setItem('LogPath', '/login')
    localStorage.setItem('LogVal', 'Login')
    if (localStorage.getItem('accessToken') === "null"){
        localStorage.setItem('LogPath', '/login')
        localStorage.setItem('LogVal', 'Login')
        navigate("/");
        return (
            <div>
                <h1><b>You are logged out.</b></h1>
            </div>
        )
    }
    else{
        localStorage.setItem('accessToken', null)
        localStorage.setItem('user_id', null)
        navigate("/");
        return(
            <div> 
                <h1><b>You have been logged out.</b></h1>
            </div>
        )
    }
    
}

export default Logout;