import React from 'react'
import {useState} from "react";

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

    return(
        <div>
            <form onSubmit={submit_update} >
                <div className='Title'>
                    <h1>Update your Profile</h1>
                    <h2>Please enter the information below to update your profile</h2>
                </div>

                <label for="Password"><b>Password</b></label>
                <input type="password" placeholder='Enter Password' name='password' id='password' required onChange={handleInput} />

                <label for="Email"><b>Email</b></label>
                <input type="email" placeholder='Enter Email' name='email' id='email' />

                <label for="FirstName"><b>First Name</b></label>
                <input type="text" placeholder='Enter First Name' name='first_name' id='first_name' onChange={handleInput} />

                <label for="LastName"><b>Last Name</b></label>
                <input type="text" placeholder='Enter Last Name' name='last_name' id='last_name' onChange={handleInput} />

                <label for="Avatar"><b>Avaatar</b></label>
                <input type="image" name='avatar' id='avatar' onChange={handleInput} />

                <label for="PhoneNumber"><b>Phone Number</b></label>
                <input type="number" name='phone_number' id='phone_number' onChange={handleInput} />

                <button type="submit" className="updatebutton">Update</button>
            </form>
        </div>
    )
}

export default Update