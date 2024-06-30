import React, {useContext, createContext, useEffect, useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'
import '../App.css';

import { useAuth } from '../Auth/AuthProvider';



const Login = () => {
    const [userEmail, setUserEmail]=useState("");
    const [userPass, setUserPass] = useState("");

    const auth = useAuth();
    
    const SubmitFunc = (e) =>{
        // console.log(auth);
        
        e.preventDefault();

        if(userEmail !=="" && userPass !==""){
            const formdata = new FormData();
            formdata.append("user_email", userEmail);
            formdata.append("user_pass", userPass);  

            auth.fetchUserData(formdata);
        }
        
    }


    return (
        <>
            <div class="Btn-container">
                <a href="/"><button class="w3-button w3-green w3-hover-black btn">Home</button></a>
            </div>

            <h4 class="w3-margin-top text">User Login Form</h4>
            <p class="text">Every fields are mandatory</p>
            <form onSubmit={SubmitFunc} id="form-container">
                <div className='fieldContainers'>
                    <span>User Id: </span>
                    <input type="text" name="enterUserEmail" placeholder="Enter your email" onChange={(e)=>{setUserEmail(e.target.value)}} class="w3-input w3-padding"/>
                </div>
                <div className='fieldContainers'>
                    <span>Password: </span>
                    <input type="text" name="enterUserPass" placeholder="Enter your password" onChange={(e)=>{setUserPass(e.target.value)}} class="w3-input w3-padding"/>
                </div>
                <div class="w3-margin-top">
                    <input type='submit' name='submit' value='login' class="w3-margin-top w3-button w3-black w3-hover-green submit-btn"/>
                </div>
            </form>
        </>
    );
}

export default Login;