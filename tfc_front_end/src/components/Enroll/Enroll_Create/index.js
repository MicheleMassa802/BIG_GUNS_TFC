import React, {useEffect, useState} from "react";
import Text from "../../Text";
import Input from "../../Input/input";
import Button from "../../Input/button";
import CreateEnrollForm from "./enroll_form";
import axios, { all } from 'axios';



// get the data from the user and send it to the backend to create as subscription

// works as a get and post for the subscription page (might want to separete this into two components)

// desired behaviour is to not need to ask for who the user is as they should only be able to subscribe
// for the logged in user and starting today, so we take care of those fields automatically

const Create_Enroll = () => {
    // user input stored here as state as its not needed anywhere else in a context
    // const [data, setData] = useState({
    //     user: "", // Find a way to populate the user to the logged in user
    //     class_info: "",
    //     modify_future_classes: false,
    //     // if is_backend is true, it means that there exist a user in the DB who is subscribed.
    //     // if is_backend is false, it means we do not have a user subscribed in the DB.
    //     is_backend: false,
    // });

    // USE uploadData and POST request to send the data to the backend
    // Figure out how you're going to get the class_info as ID of the class and not the name!
    // const [uploadData, setUploadData] = useState({
    //     user: 3,
    //     class_info: 3,
    //     modify_future_classes: false
    // });

    // make a get request to get the user's sub object if it exists, return true and set the data to the sub object
    // if it doesn't exist, return false
    // function Is_subbed(){
    //     const {user_id, token} = params;
    //     // send a request to the API to post the new sub
    //     const url = `http://localhost:8000/subscriptions/${user_id}/subscription_page/`;
    //     const config = {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": `Bearer ${token}`,
    //         }
    //     };
    //     fetch(url, config)
    //     .then((response) => response.json())
    //     .then((data) => {
    //         //console.log("GET")
    //         // if the user has a sub, set the data to the sub object and return true
    //         if (data.message === undefined){
    //             // user has a sub, add is_backend to data and set the data to the sub object
    //             setData({...data, is_backend: true});
    //             return true;
    //         } else {
    //             // user doesn't have a sub, add is_backend to data and set the data to the sub object
    //             setData({...data, is_backend: false});
    //             return false;
    //         }
    //     });

    // }


    // create get request to backend, then get the response and carry out the corresponding procedure
    // useEffect(() => {
        
    //     // make func call
    //     Is_subbed();

    //     // make it so that this runs whenever setData is called
    //     }, [params, setData]);
    

    // function Submit_form(submission) {
    //     //useEffect(() => {
    //         // send data to backend to enroll user in new class
    //         submission.preventDefault();
    //         console.log("Form data entered ", uploadData);

    //         // create post request to backend, then get the response and show the user the new subscription
    //         const {user_id, token} = params;
    //             // send a request to the API to post the new sub
    //             const url = `http://127.0.0.1:8000/classes/user/enroll/${user_id}/`;
    //             // fetch(url,{
    //             //     method:'POST',
    //             //     body:JSON.stringify(uploadData),
    //             //     headers:{
    //             //         'Content-type': 'application/json; charset=UTF-8',
    //             //         'Authorization': `Bearer ${token}`,
    //             //     },
    //             // })
    //             // .then(response=>response.json())
    //             // .then((data)=>{
    //             //     console.log(data);
    //             //     setData(data);
    //             // });

    //             const config = {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     "Authorization": `Bearer ${token}`,
    //                 },
    //                 body:JSON.stringify(uploadData),
    //             };

    //             fetch(url, config)
    //                 .then((response) => response.json())
    //                 .then((data) => {
    //                     console.log("POST returned INFO:  ", data);
    //                     // Save to state
    //                     setData(data);
    //                     // Is_subbed();
    //                 })
    //                 .catch((error) => {
    //                     alert("oopsie woopsie I fucky wucky uppy THE FUCKING CODE", error)
    //                 });
    //     //}, [params, uploadData, setData]);
    // }


    // NEW CODE AAAKSH
     
    // const [classDetailsEntered, setClassDetailsEntered] = useState({
    //     'class_info': null,
    //     'user': null,
    //     'modify_future_classes': false
    // });

        // console.log("ALL CLASSES SAVE? : ", allClasses)
    
    // Whenever input is changed on form, add the new changes to classDetailsEntered 
    // const handleInputChange = (e) => {
        
    //     setClassDetailsEntered({
    //         ...classDetailsEntered,
    //         [e.target.name]: e.target.value
    //     }); 
    // }
    
    // function form_submit(submission) {
    //     submission.preventDefault();

    //     console.log("Called")
    //     const formData = new FormData(); 
    //     formData.append('class_info', 123) // FIgoure out someway to get id of the class. Maybe change backend to send id too so you cna access it from the list of allClasses
    //     formData.append('modify_future_classes', classDetailsEntered.modify_future_classes)
    //     //formData.append('user', )
    //     console.log("FORM DATA: ", formData)
    //     const urlToAdd = `http://127.0.0.1:8000/classes/user/enroll/${user_id}/`;
    //     const config = {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": `Bearer ${token}`,
    //         },
    //         body:JSON.stringify(formData),
    //     };

    //     fetch(urlToAdd, config)
    //         .then((response) => response.json())
    //         .then((data) => {
    //             data['user'] = 1;
    //             data['class_info'] = 116;
    //             data['modify_future_classes'] = false;
                
    //             console.log("POST returned INFO:  ", data);
    //             // Save to state
    //             // setAllClasses(data[0]);
    //             // Is_subbed();
    //         })
    //         .catch((error) => {
    //             alert("oopsie woopsie I fucky wucky uppy THE FUCKING CODE", error)
    //         });
    // }
    // // function for storing name
    // // e denotes the radio button. we use .name for the button we talk about i.e Yes or No button and .value is what the user pressed
    // const handleInput = e => {
    //     const newData = {...uploadData,
    //         user: params.user_id,
    //         //class_info: parseInt("3"),
    //         };
    //         if (e.target.value == "Yes")
    //             newData['modify_future_classes'] = true;
    //         else
    //             newData['modify_future_classes'] = false;
        
    //     newData['class_info'] =  123;        
    //     setUploadData(newData);
    //     //console.log(newData);
    // };

    //////////////////////////////////////////////////////////////////////////////
    // WEDNESDAY WORKING CODE
    const [params, setParams] = useState({
        user_id: 1,  // for now default is 1, see how to set this up correctly using the global context
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjcwNjAyNzkyLCJpYXQiOjE2NzA1MTYzOTIsImp0aSI6ImMwMDI0ZjFiYTUwYjQzZThhZWYxNmFiYTAxZGQ5ZDgxIiwidXNlcl9pZCI6MX0.0x4Va-HVQaUVq72_sGEmvAqHSLKpbgThViM7BSk82eU',
    });
    const [allClasses, setAllClasses] = useState([]);
    const {user_id, token} = params;
    const url = `http://127.0.0.1:8000/classes/viewAllStudioClasses/allClasses/`;
    // Fetch data of all studio and all for now but do changes as explained in other comment about new url path 
    useEffect(() => {
        const config = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        };

        fetch(url, config)
            .then((response) => response.json())
            .then((data) => {
                console.log("GET returned INFO:  ", data.results);
                // Save to state
                setAllClasses(data);
                // Is_subbed();
            })
            .catch((error) => {
                alert("oopsie woopsie I fucky wucky uppy THE FUCKING CODE", error)
            });
        }, []);

    // defualt values for form data 
    const [enrollData, setEnrollData] = useState({
        'modify_future_classes': false,
        'user': params.user_id,
        'class_info': null // sample class id for now
    })

    // Change element value upon form input change
    const handleFormChange = (e) => {
        setEnrollData({
            ...enrollData,
            
            [e.target.name]: e.target.value
        });

        // if (e.target.name == "modify_future_classes"){

        //     if (e.target.value == "Yes"){
        //         enrollData['modify_future_classes'] = true;
        //         // SAVE TO State
        //         setEnrollData({...enrollData});
        //      }
        //     else{
        //         enrollData['modify_future_classes'] = false;
        //         // SAVE TO STATE
        //         setEnrollData({...enrollData});
        //     }
        // }
        
        console.log("What is my enroll data: ", enrollData['modify_future_classes'])
        if (e.target.name == "class_info"){
            
            // Do some get request stuff to find out the ID of the entered class! and then parseInt(). Maybe send id as well from django response
            const IDPart = e.target.value.split(')')[0];
            // console.log(IDPart)
            const extractedID = IDPart.slice(5);
            // console.log("ID EXTRACTED:", extractedID)
            enrollData["class_info"] = parseInt(extractedID)
            // console.log("WHAT'S CLASS INFO: ", enrollData["class_info"])

            // Save the data in state to store the change
            setEnrollData({...enrollData})
        }
           

        if (e.target.name == "user"){
            enrollData["user"] = parseInt(enrollData["user"])

            // Save the data in state to store the change
            setEnrollData({...enrollData})
        }
         

    }

    //console.log("FORM DATA ENTERED: ", enrollData)

    const submitEnrollData = () => {
        const enrollFormData = new FormData();
        console.log("nani tf", enrollData["modify_future_classes"])
        enrollFormData.append("modify_future_classes", enrollData.modify_future_classes);
        enrollFormData.append("user", enrollData.user);
        enrollFormData.append("class_info", enrollData.class_info);

        // Post the data
        console.log(enrollFormData)
        try{
            axios.post(`http://127.0.0.1:8000/classes/user/enroll/${enrollData.user}/`, enrollFormData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    
                },      
            })
            .then((response) => {
                console.log("SENDING DATA: ", response.data);
            });
        }catch(error){
            console.log("ERROR MESSAGE: ", error);
        }
        
    }

    //var options_with_classes = 
    console.log("")
    return (
        <div>
            <Text> Enroll in classes! </Text>
            {/* <form onSubmit={form_submit}> */}
                <label > Drop you wish to enroll in future classes (default response is <b>No</b>)?</label>
                {/* call respective handling functions*/}
                <input type="radio" id="yes" name="modify_future_classes" value={true} onChange={handleFormChange}/>
                <label htmlFor="yes"> Yes </label>
                <br></br>
                <label for="class_info"> Class to enroll in:  </label>
                <select name="class_info" onChange={handleFormChange}>
                    <>
                    <option selected disabled hidden>Select a class </option>
                    {allClasses.map((classObj, index) => {return <option key={index} >{
                    `(ID: ${classObj.id})` + ' ' + 
                    classObj.name + ' on ' + classObj.start_time.replace('T', ' ').replace('Z', '')}</option>}
                    )}
                    </>
                    
                </select>

                {/* <Select options={allClasses}
                defaultValue={{label: "Choose one", value: ""}}>
                    {allClasses.map((classObj, index) => {return <option key={index} defaultValue={classObj.id} >{
                    `(ID: ${classObj.id})` + ' ' + 
                    classObj.name + ' on ' + classObj.start_time.replace('T', ' ').replace('Z', '')}</option>}
                    )}</Select> */}
                <br></br> 

                <button onClick={submitEnrollData} type="submit"> Enroll </button>
            {/* </form> */}
        </div>
        );

    // if (data["is_backend"] === true){
    //     // data coming from backend means user is subbed
    //     return (
    //         <div>
    //             <Text> Subscription Details </Text>
    //             <Text> User: {data.related_user} </Text>
    //             <Text> Subscription Type: {data.sub_type} </Text>
    //             <Text> Subscription Start Date: {data.sub_start_date} </Text>
    //             <Text> Payment Card: {data.payment_card} </Text>
    //         </div>
                
    //     );
    // } else {
    //     return (
    //         <div>
    //             <Text> You are not yet subscribed.Subscribe Here! </Text>
    //             <form onSubmit={Submit_form}>
    //                 <label> Subscription Type: </label>
    //                 {/* call respective handling functions*/}
    //                 <input type="radio" id="monthly" name="sub_type" value="14.99" required onChange={handleInput}/>
    //                 <label htmlFor="monthly"> Monthly </label>
    //                 <input type="radio" id="yearly" name="sub_type" value="149.99" onChange={handleInput}/>
    //                 <label htmlFor="yearly"> Yearly </label>
    //                 <br></br>
    //                 <label> Payment Card: </label>
    //                 <input type="text" name="payment_card" placeholder="Payment Card" required onChange={handleInput}/>
    //                 <br></br> 
    //                 <Button label="Submit"/>
    //             </form>
    //         </div>
    //         );
    // }
}

export default Create_Enroll;