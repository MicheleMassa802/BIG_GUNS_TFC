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
        <div className="papa-container">
            <div className="logo">
                <div className="text">
                    TFC
                </div>
            </div>
            <nav className="nav">
                <ul className="nav-list">
                    <li className="nav-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        Studios
                        <ul className="nav-item-drop-studios">
                            <li className="drop-item">
                                <Link to="/studios">Studios</Link>
                            </li>
                            <li className="drop-item">
                                <Link to="/filter_studios">Filter Studios</Link>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                       Classes Information
                        <ul className="nav-item-drop">
                            <li className="drop-item">
                                <Link to="/enroll">Enroll in classes</Link>
                            </li>
                            <li className="drop-item">
                                <Link to="/drop">Drop from classes</Link>
                            </li>
                            <li className="drop-item">
                                <Link to="/class_history">View class history</Link>
                            </li>
                            <li className="drop-item">
                                <Link to="/filter_classes">Filter Classes</Link>
                            </li>
                        </ul>    
                    </li>
                    <li className="nav-item">
                        Subscriptions & Payments
                        <ul className="nav-item-drop">
                            <li className="drop-item">
                                <Link to="/get_sub">View Subscription</Link>
                            </li>
                            <li className="drop-item">
                                <Link to="/create_sub">Get a Subscription</Link>
                            </li>
                            <li className="drop-item">
                                <Link to="/update_sub">Update Subscription</Link>
                            </li>
                            <li className="drop-item">
                                <Link to="/cancel_sub">Cancel Subscription</Link>
                            </li>
                            <li className="drop-item">
                                <Link to="/payments">View Payments</Link>
                            </li>
                        </ul>    
                    </li>
                    <li className="nav-item">
                    Account Information
                        <ul className="nav-item-drop-account">
                            <li className="drop-item">
                                <Link to="/register">Register</Link>
                            </li>
                            <li className="drop-item">
                                <Link to={path}>{logText}</Link>
                            </li>
                            <li className="drop-item">
                                <Link to="/profile">View Profile</Link>
                            </li>
                            <li className="drop-item">
                                <Link to="/update">Update Profile</Link>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <Link to="/about">About Us</Link>
                    </li>
                </ul>
            </nav>
            <Outlet/>
        </div>

        /////////// original navbar
        // <div className="navigation">
        //     <div className="logo">
        //         TFC
        //     </div>
        //     <nav className="paths">
        //         <ul className="items">
        //             <li>
        //                 <Link to="/">Home</Link>
        //             </li>
        //             {/* <li>
        //                 <div class="dropdown">
        //                     <button class="dropbtn">Dropdown 
        //                     <i class="fa fa-caret-down"></i>
        //                     </button>
        //                     <div class="dropdown-content">
        //                         <a href="#">Link 1</a>
        //                         <a href="#">Link 2</a>
        //                         <a href="#">Link 3</a>
        //                     </div>
        //                 </div> 
        //             </li> */}
        //             <li>
        //                 <Link to="/studios">Studios</Link>
        //             </li>
        //             <li>
        //                 <Link to="/classes">Classes</Link>
        //             </li>
        //             <li>
        //                 <Link to="/subscriptions">Subscriptions</Link>
        //             </li>
        //             <li>
        //                 <Link to={path}>{logText}</Link>
        //             </li>
        //             <li>
        //                 <Link to="/register">Register</Link>
        //             </li>
        //             <li>
        //                 <Link to="/update">Update Profile</Link>
        //             </li>
        //             <li>    
        //                 <Link to="/payments">Payments</Link>
        //             </li>
        //             <li>
        //                 <Link to="/about">About Us</Link>
        //             </li>
        //         </ul>
        //     </nav>
        //     <Outlet />
        // </div>
    )
}

export default Navbar;