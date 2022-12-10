import React from 'react'
import {useState} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Text from '../Text';
import './style.css'

const Register = () =>{
    let navigate = useNavigate()
    const [uploadData, setUploadData] = useState({
        username: "",
        password: "",
        email: "",
        first_name:"",
        last_name:"",
        avatar:null,
        phone_number:null
    });

    function submit_register(submission){
        submission.preventDefault();

        const url = 'http://127.0.0.1:8000/accounts/register/'
        const config = {
            method: "POST",
            headers:{
                "Content-type": "application/json"
            },
            body: JSON.stringify(uploadData)
        };
        fetch(url, config)
            .then((response) => response.json())
            .then((data) => console.log(data))
        navigate("/login");
    };

    const handleInput = e => {
        const newData = {...uploadData}
        newData[e.target.name] = e.target.value;
        setUploadData(newData)
        console.log(uploadData)
    };

    const handleImage = e => {
        console.log("Image Handling")
        const newData = {...uploadData}
        newData[e.target.name] = URL.createObjectURL(e.target.files[0]);
        setUploadData(newData)
        console.log(uploadData)
    }

    return(
        <div className='container'>
            <div className='Title'>
                    <Text>Register!</Text>
                    <p>Please enter the information below to create your account</p>
                </div>
            <form onSubmit={submit_register} >
                <label htmlFor="Username"><p>Username</p></label>
                <input type="text" placeholder='Enter Username' name='username' id='username' required onChange={handleInput} />

                <label htmlFor="Password"><p>Password</p></label>
                <input type="password" placeholder='Enter Password' name='password' id='password' required onChange={handleInput} />

                <label htmlFor="Email"><p>Email</p></label>
                <input type="email" placeholder='Enter Email' name='email' id='email' />

                <label htmlFor="FirstName"><p>First Name</p></label>
                <input type="text" placeholder='Enter First Name' name='first_name' id='first_name' onChange={handleInput} />

                <label htmlFor="LastName"><p>Last Name</p></label>
                <input type="text" placeholder='Enter Last Name' name='last_name' id='last_name' onChange={handleInput} />

                <label htmlFor="Avatar"><p>Avatar</p></label>
                <input type="file" name='avatar' id='avatar' onChange={handleImage} />

                <label htmlFor="PhoneNumber"><p>Phone Number</p></label>
                <input type="number" name='phone_number' id='phone_number' onChange={handleInput} />

                <button type="submit" className="registerbutton">Register</button>
            </form>
        </div>
    )
}

export default Register;