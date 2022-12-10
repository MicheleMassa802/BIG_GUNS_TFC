import {useState, useContext} from "react";
// import UserContext from "../../Contexts/user";
import { Navigate, useNavigate } from "react-router-dom";
import Text from "../Text";
import './style.css'

const Logval = () => {
    let navigate = useNavigate()
    // const { setLogin } = useContext(LoginContext);
    
    // useEffect(() => {
    //     const url = 'http://localhost:8000/accounts/api/token/'

    //     fetch(url, config)
    //         .then(res => res.json())
    //         .then(json => {
    //             setLogin(json.data)
    //         })
    // }), [setLogin];
    
    // const { user, setUser } = useContext(UserContext);

    const [IsUpdated, setUpdated] = useState("false");
    const [uploadData, setUploadData] = useState({
        username: "",
        password: "",
    });

    function submit_login(submission){
        submission.preventDefault();

        const url = 'http://127.0.0.1:8000/accounts/api/token/'
        const config = {
            method: "POST",
            headers:{
                "Content-type": "application/json"
            },
            body: JSON.stringify(uploadData)
        };
        fetch(url, config)
            .then((response) => response.json())
            .then((data) => {
                localStorage.setItem('LogPath', '/login')
                localStorage.setItem('LogVal', 'Login')
                if (data.access) {
                    localStorage.setItem('accessToken', 'Bearer ' + data.access);
                    if (localStorage.getItem("accessToken") !== null){
                        localStorage.setItem('LogPath', '/login')
                        localStorage.setItem('LogVal', 'Login')
                        const url2 = 'http://127.0.0.1:8000/accounts/user/'
                        const config2 = {
                            method: "GET",
                            headers:{
                                "Authorization": localStorage.getItem('accessToken')
                            }
                        };
                        fetch(url2, config2)
                            .then((response) => response.json())
                            .then((data) => {
                                localStorage.setItem('user_id', data);
                            })
                    };
                    setUpdated("true");
                    navigate("/");
                }
                // if (data.refresh){
                //     localStorage.setItem('refreshToken', data.refresh)
                // }
                if (data.detail){
                    setUpdated("false");
                }
            })
    
    };
    // GOT TO CHECK HOW ERROR HANDLING WORKS, WHAT HAPPENS WHEN USERNAME PASSWORD ARE ENTERED WRONG. ALSO GOT TO REDIRECT USER TO HOME PAGE ONCE LOGGED IN.


    const handleInput = e => {
        const newData = {...uploadData}
        newData[e.target.name] = e.target.value;
        setUploadData(newData)
    };

    if (localStorage.getItem('accessToken')  === "null"){
        console.log(uploadData.isBackend)
        return(
            <div className='container'>
                <Text>Login</Text>
                <p>Please enter the information below to login to your account</p>
                <form onSubmit={submit_login}>
                    <label htmlFor="Username"><p>Username</p></label>
                    <input type="text" placeholder='Enter Username' name='username' id='username' required onChange={handleInput} />

                    <label htmlFor="Password"><p>Password</p></label>
                    <input type="password" placeholder='Enter Password' name='password' id='password' required onChange={handleInput} />
                        
                    <button type="submit" className="loginbutton">Login</button>
                </form> 
                {IsUpdated === "false" ? <p></p> : <p>Either Username or Password is incorrect</p>}
            </div>
        )
    } else {
        return(
            <div>
                <p className="Logged"><b>You are already logged in</b></p>
            </div>
            // <div>
            //     <h1>You have been logged out</h1>
            //     <h1>Login</h1>
            //     <form onSubmit={submit_login}>
            //         <label htmlFor="Username"><b>Username</b></label>
            //         <input type="text" placeholder='Enter Username'  id='username' required onChange={handleInput} />

            //         <label htmlFor="Password"><b>Password</b></label>
            //         <input type="password" placeholder='Enter Password'  id='password' required onChange={handleInput} />
                        
            //         <button type="submit" className="loginbutton">Login</button>
            //     </form> 
            // </div>
        )
    }
}

export default Logval
