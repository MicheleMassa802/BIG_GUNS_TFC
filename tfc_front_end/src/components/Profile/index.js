import React from 'react'
import {useState, useEffect} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Text from "../Text";
import './style.css'

const Profile = () => {
    let navigate = useNavigate()
    const [IsUpdated, setUpdated] = useState("false");
    const [uploadData, setUploadData] = useState({
        username: "",
        password: "",
        email: "",
        first_name:"",
        last_name:"",
        avatar:null,
        phone_number:null
    });

    useEffect(() => {
        const url = `http://127.0.0.1:8000/accounts/${localStorage.getItem("user_id")}/profile/`
        const config = {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem('accessToken')
            }
        };
        fetch(url,config)
        .then((response) => response.json())
        .then((data) => {
            setUploadData(data);
            setUpdated("true")
        })
        .catch((error) => {
            setUpdated("false");
        });
    })

    if (localStorage.getItem("user_id") === "null"){
        return(
            <>
                <h1> You must be logged in to view your profile</h1>
            </>
        )
    } else {
        // getInfo();
        return (
            <>
            <Text> Your Profile </Text>
            <p>Username: {uploadData.username}</p>
            <p>Email: {uploadData.email}</p>
            <p>First Name: {uploadData.first_name}</p>
            <p>Last Name: {uploadData.last_name}</p>
            <p>Phone Number: {uploadData.phone_number}</p>
            <p>Avatar:</p>
            {/* <img src={URL.createObjectURL(Blob)} alt='' /> */}
            <img className='image' src={uploadData.avatar}></img>
            </>
        )
    }
}

export default Profile