import React from 'react'
import {useState} from "react";
import Text from '../Text';
import './style.css'

const Update = () =>{
    const [uploadData, setUploadData] = useState({
        password: "",
        email: "",
        first_name:"",
        last_name:"",
        avatar:"",
        phone_number:""
    });

    function submit_update(submission){
        submission.preventDefault();
        const { user_id } = localStorage.getItem('user_id')
        const url = `http://127.0.0.1:8000/accounts/${user_id}/update/`
        const config = {
            method: "PATCH",
            headers:{
                "Content-type": "application/json"
            },
            body: JSON.stringify(uploadData)
        };
        fetch(url, config)
            .then((response) => response.json())
            .then((data) => console.log(data))
    };

    const handleInput = e => {
        const newData = {...uploadData}
        newData[e.target.name] = e.target.value;
        console.log(newData)
        setUploadData(newData)
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
                    <Text>Update your Profile</Text>
                    <p>Please enter the information below to update your profile</p>
                </div>
            <form onSubmit={submit_update} >

                <label for="Password"><p>Password</p></label>
                <input type="password" placeholder='Enter Password' name='password' id='password' required onChange={handleInput} />

                <label for="Email"><p>Email</p></label>
                <input type="email" placeholder='Enter Email' name='email' id='email' />

                <label for="FirstName"><p>First Name</p></label>
                <input type="text" placeholder='Enter First Name' name='first_name' id='first_name' onChange={handleInput} />

                <label for="LastName"><p>Last Name</p></label>
                <input type="text" placeholder='Enter Last Name' name='last_name' id='last_name' onChange={handleInput} />

                <label for="Avatar"><p>Avaatar</p></label>
                <input type="file" name='avatar' id='avatar' onChange={handleImage} />

                <label for="PhoneNumber"><p>Phone Number</p></label>
                <input type="number" name='phone_number' id='phone_number' onChange={handleInput} />

                <button type="submit" className="updatebutton">Update</button>
            </form>
        </div>
    )
}

export default Update