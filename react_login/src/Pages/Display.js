import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import {useAuth} from '../Auth/AuthProvider';
import '../App.css';

import AddProfile from './components/Profile';
import ExportUserId from './components/UserId';



const Display = () =>{ 
    const [getUserSkuData, setUserSkuData] = useState([]);
    useEffect(()=>{fetchItemData()},[]);
    
    const auth = useAuth();
    const hashed_id=auth.userId;
    const getToken = auth.token;


    const fetchItemData = async() =>{
        //fetch user id.        
        await fetch(`http://127.0.0.1/Projects/php-api/reactCRUD/Fetch_user_details.php?user_hash_id=${hashed_id}`).then((data)=>{
            return data.json();
        }).then((data)=>{
            const getProfileId = data.get_user_data[0].id;

            //fetch data.
            fetch(`http://127.0.0.1/Projects/php-api/reactCRUD/Fetch.php?user_id=${getProfileId}&token=${getToken}`).then((result)=>{
            return result.json();
            }).then((data)=>{
                switch(data.status_code){
                    case 404:
                        setUserSkuData([]);
                        break;
                    case 500:
                        Swal.fire({
                            icon:"error",
                            title: 'Internal Server Error!',
                            text:JSON.parse(JSON.stringify(data.message)),
                            timer:30000
                        });
                        break;
                    default:
                        setUserSkuData(data.display);
                        break;
                }

                if(data.token === ""){
                    Swal.fire({
                        icon:"info",
                        html:"<span style='color:#ff3333; font-size:22px;'>" + data.message + "</span>",
                        timer:13000
                    });
                    auth.Logout();
                }
            })
        });

        
    }


    const deleteRecord = async(id) =>{
        const isConfirm = await Swal.fire({
            icon:'warning',
            title: 'Are you sure?',
            text:"Delete Row?",
            showCancelButton: true,
            confirmButtonText: 'delete',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
        }).then((res)=>{
            return res.isConfirmed
        });

        if(!isConfirm){
            return false;
        }else{
            await axios.get(`http://127.0.0.1/Projects/php-api/reactCRUD/Delete.php?item_id=${id}&token=${getToken}`).then((res)=>{
                console.log(res.data);
                switch(res.data.status_code)
                {
                    case 200:
                        Swal.fire({
                            icon:"success",
                            html:"<span style='font-size:22px;'>" + res.data.message + "</span>",
                            timer:13000
                        });
                        fetchItemData();
                        break;
                    case 500:
                        Swal.fire({
                            icon:"error",
                            title: 'Internal Server Error!',
                            html:"<span style='color:#ff3333; font-size:22px;'>" + res.data.message + "</span>",
                            timer:13000
                        });
                        break;
                }

                if(res.data.token === ""){
                    Swal.fire({
                        icon:"info",
                        html:"<span style='color:#ff3333; font-size:22px;'>" + res.data.message + "</span>",
                        timer:13000
                    });
                    auth.Logout();
                }
            })
        }

    }



    return (
        <>
            <AddProfile />
            
            <div class="CRUD-description">
                <h4>Display Items</h4>
            </div>
            <div class="crud-container">
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Item Type</th>
                        <th>Item Name</th>
                        <th>Quantity</th>
                        <th>Payable</th>
                        <th>Unit Price</th>
                        <th>Total Price</th>
                        <th>Transport Options</th>
                        <th>Edit Record</th>
                        <th>Delete Record</th>
                    </tr>

                    {
                        (getUserSkuData.length > 0) ? getUserSkuData.map((row, i)=>(
                            <tr>
                                <td>{i+1}</td>
                                <td>{row.type}</td>
                                <td>{row.item_name}</td>
                                <td>{row.qty}</td>
                                <td>{row.payable}</td>
                                <td>{row.unit_price}</td>
                                <td>{row.total}</td>
                                <td>{row.transport}</td>
                                <td><Link to={`/edit/${row.id}/${row.user_id}`}><button class="w3-button w3-green w3-hover-black edit-btn">Edit</button></Link></td>
                                <td><button class="w3-button w3-red w3-hover-yellow del-btn" onClick={()=>deleteRecord(row.id)}>Delete</button></td>
                            </tr>
                        )) : (
                            <tr>
                                <td colspan="10" class="w3-text-red">No Data Available</td>
                            </tr>
                        )
                    }   

                </table>
            </div>
        </>
    );
}


export default Display;