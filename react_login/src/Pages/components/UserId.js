import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useAuth} from '../../Auth/AuthProvider';


const ExportUserId = (url) =>{
    const auth = useAuth();
    const hashed_id=auth.userId;

    const [getProfileId, setProfileId] = useState([]);

    useEffect(()=>{GetUserId()},[]);

    const GetUserId = async() =>{
        await fetch(url).then((data)=>{
            return data.json();
        }).then((data)=>{
            setProfileId(data.get_user_data[0]);
        })
    }

    return getProfileId;
}


export default ExportUserId;