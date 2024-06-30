import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import {useAuth} from '../../Auth/AuthProvider';
import '../../App.css';



const GetAuth = ()=>{
    const auth = useAuth();
    return auth;
}


const AddProfile = () =>{
    const auth = GetAuth();

    //console.log(auth.userId);
    const hashed_id=auth.userId;
    useEffect(()=>{FetchProfileDetails()},[]);
    const [getProfileData, setProfileData] = useState([]);

    const FetchProfileDetails = async() =>{
        await fetch(`http://127.0.0.1/Projects/php-api/reactCRUD/Fetch_user_details.php?user_hash_id=${hashed_id}`).then((data)=>{
            return data.json();
        }).then((data)=>{
            setProfileData(data.get_user_data[0]);  //Fetching Array And Updating The Current State.
        }).catch((err)=>{
            console.log(err);
        })
    }


    
    return(
        <div className='profile-container'>
            <div class="w3-right logout-btn-container">
                <button class="w3-button w3-red w3-hover-orange w3-margin-right logout-btn" onClick={()=>auth.Logout()}>Logout</button>
            </div>
            <div>
                <img src={getProfileData["file_path"] + getProfileData["user_photo"]} class="profile-img" alt="user image"/>
                <p class="user-name">{getProfileData["user_name"]}</p>
                <p class="email-container"><span class="email-txt">Email:- </span><span class="email">{getProfileData["user_email"]}</span></p>
            </div>
            <div class="Btn-container">
                <a href="/add-data"><button class="w3-button w3-green w3-hover-black nav-btn">Add Data</button></a>
                <a href="/display"><button class="w3-button w3-green w3-hover-black nav-btn">Display Data</button></a>
            </div>
            <hr class="h-ruler"/>
        </div>
    );
}





export default AddProfile;