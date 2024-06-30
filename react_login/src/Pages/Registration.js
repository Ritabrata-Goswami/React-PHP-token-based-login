import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'
import '../App.css';



const CreateUsre = () =>{
    
    const navigate = useNavigate();

    const [getUserName, setUserName] = useState("");
    const [getUserEmail, setUserEmail] = useState("");
    const [getUserPass, setUserPass] = useState("");
    const [getUserPhoto, setUserPhoto] = useState("");

    const SubmitFunc = async(event) =>{ 
        event.preventDefault();   //prevent form to submit if fields are blank.

        const formdata = new FormData();
        formdata.append("user_name",getUserName);
        formdata.append("user_email",getUserEmail);
        formdata.append("user_pass",getUserPass);
        formdata.append("user_file",getUserPhoto);

        if(getUserName !=="" && getUserEmail !=="" && getUserPass !=="" && getUserPhoto === ""){
            Swal.fire({
                icon:"error",
                text:"File is mandatory!",
                timer:10000
            });
            return false;
        }

        await axios({
            method:'post',
            url:'http://127.0.0.1/Projects/php-api/reactCRUD/registration.php',
            data:formdata   
        }).then((data)=>{
            // console.log((JSON.stringify(data)));

            switch(JSON.parse(JSON.stringify(data.data.code)))
            {
                case 3:
                    Swal.fire({
                        icon:"success",
                        text:JSON.parse(JSON.stringify(data.data.message)),
                        timer:10000
                    });
                    break;
                case 0:
                    Swal.fire({
                        icon:"error",
                        text:JSON.parse(JSON.stringify(data.data.message)),
                        timer:10000
                    });
                    break;
                case 2:
                    Swal.fire({
                        icon:"error",
                        text:JSON.parse(JSON.stringify(data.data.message)),
                        timer:10000
                    });
                    break;
                case 4:
                    Swal.fire({
                        icon:"error",
                        text:JSON.parse(JSON.stringify(data.data.message)),
                        timer:10000
                    });
                    break;
            }
            
        }).catch((err)=>{
            // console.log(JSON.stringify(err);
            Swal.fire({
                icon:"error",
                text:JSON.parse(JSON.stringify(err.data.message))
            });
        });
    }


    return(
        <>
            <div class="Btn-container">
                <a href="/"><button class="w3-button w3-green w3-hover-black btn">Home</button></a>
            </div>

            <h4 class="w3-margin-top text">User Registration Form</h4>
            <p class="text">Every fields are mandatory</p>
            <form onSubmit={SubmitFunc} id="form-container">
                <div className='fieldContainers'>
                    <span>Name: </span>
                    <input type="text" name="enterUserName" placeholder="Enter your name" onChange={(e)=>{setUserName(e.target.value)}} class="w3-input w3-padding"/>
                </div>
                <div className='fieldContainers'>
                    <span>Email: </span>
                    <input type="text" name="enterUserEmail" placeholder="Enter your email" onChange={(e)=>{setUserEmail(e.target.value)}} class="w3-input w3-padding"/>
                </div>
                <div className='fieldContainers'>
                    <span>Password: </span>
                    <input type="text" name="enterUserPass" placeholder="Enter your password" onChange={(e)=>{setUserPass(e.target.value)}} class="w3-input w3-padding"/>
                </div>
                <div className='fieldContainers'>
                    <span>Files: </span>
                    <input type="file" name="enterFile" onChange={(e)=>{setUserPhoto(e.target.files[0])}} />
                </div>
                <div class="w3-margin-top">
                    <input type='submit' name='submit' value='submit' class="w3-margin-top w3-button w3-black w3-hover-green submit-btn"/>
                </div>
            </form>
        </>
    );
}


export default CreateUsre;