import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import './style.css'

const Logout = () => {
    let navigate = useNavigate()
    localStorage.setItem('LogPath', '/login')
    localStorage.setItem('LogVal', 'Login')
    navigate("/");
    if (localStorage.getItem('accessToken') === "null"){
        localStorage.setItem('LogPath', '/login')
        localStorage.setItem('LogVal', 'Login')
        return (
            <div>
                <p><b>You are logged out.</b></p>
            </div>
        )
    }
    else{
        localStorage.setItem('accessToken', null)
        localStorage.setItem('user_id', null)
        return(
            <div> 
                <p><b>You have been logged out.</b></p>
            </div>
        )
    }
    
}

export default Logout;