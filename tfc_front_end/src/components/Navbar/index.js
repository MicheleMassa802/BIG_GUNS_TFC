import {Link, Outlet} from "react-router-dom";
import { useState, useEffect } from "react";
import "./style.css"

const Navbar = () => {
    // NEED TO GET FUNCTION TO WORK TO CHANGE LOGIN BUTTON AND PATH TO LOGOUT

    const [logText, setLogText] = useState("")
    const [path, setPath] = useState("")
        
    function handleURL(){
        console.log("Runs1")
        if (localStorage.getItem('accessToken') === "null"){
            console.log("Runs2")
            setPath("/login")
        }
        else {
            setPath("/logout")
        }
    }

    function handleText(){
        if (localStorage.getItem('accessToken') === "null"){
            setLogText("Login")
        }
        else {
            setLogText("Logout")
        }
    }

    useEffect(() => {handleText();
        handleURL();}, [setLogText, setPath])
    return (
        // <>
        //     <nav>
        //         <Link to="/converter">Converter</Link>
        //         <Link to="/calculator">Calculator</Link>
        //         <Link to="/players">Players</Link>
        //     </nav>
        // </>
        <div className="navigation">
            <div className="logo">
                TFC
            </div>
            <nav className="paths">
                <ul className="items">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/studios">Studios</Link>
                    </li>
                    <li>
                        <Link to="/classes">Classes</Link>
                    </li>
                    <li>
                        <Link to="/subscriptions">Subscriptions</Link>
                    </li>
                    <li>
                        <Link to={path}>{logText}</Link>
                    </li>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                    <li>
                        <Link to="/update">Update Profile</Link>
                    </li>
                    <li>
                        <Link to="/payments">Payments</Link>
                    </li>
                    <li>
                        <Link to="/about">About Us</Link>
                    </li>
                </ul>
            </nav>
            <Outlet />
        </div>
    )
}

export default Navbar;