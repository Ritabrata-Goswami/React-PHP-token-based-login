import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import {useAuth} from '../Auth/AuthProvider';
import '../App.css';

import AddProfile from './components/Profile';
import RadioBtn from './components/RadioBtn';
import {CheckBox, EditCheckBox, dataObj} from './components/CheckBoxBtn';




const Update =()=>{
                        ////For query string.
    // const queryString = window.location.search;
    // const urlParams = new URLSearchParams(queryString);
    // const paramValue = urlParams.get('id');
    // console.log("Param id:- "+paramValue);

    const { itemId, userId } = useParams();
    const auth = useAuth();
    const getToken = auth.token;

    const navigate = useNavigate();

    const [selectType, setTypeChange] = useState("");
    const [getItemName, setItemName] = useState("");
    const [getItemQty, setItemQty] = useState("");
    const [getItemUPrice, setItemUPrice] = useState("");
    const [getPayStatus, setPayStatus] = useState("");
    const [getTrans, setTrans] = useState([]);


    useEffect(() => {FetchItemData()}, []);
    const [getSpecificData, setSpecificData] = useState([]);


    const handlePayStatus = (e) =>{
        setPayStatus(e.target.value);
        if(e.target.value === "No"){
            setItemUPrice(0);
        }else{
            setItemUPrice(localStorage.getItem("U-Price"));
        }
    }


    function setTransVal(e){
        if(e.target.checked){
            setTrans([...getTrans, e.target.value]);
        }else{
            setTrans(getTrans.filter((val)=> val !== e.target.value));
        }
    }



    const FetchItemData = async()=>{
        await fetch(`http://127.0.0.1/Projects/php-api/reactCRUD/Fetch_specific.php?user_id=${userId}&item_id=${itemId}&token=${getToken}`).then((res)=>{
            return res.json();
        }).then((data)=>{
            console.log(data.display_specific);
            switch(data.status_code)
            {
                case 404:
                    setSpecificData([]);
                    break;
                case 500:
                    setSpecificData([
                        {
                            "status_code":500, 
                            "err_message":"Sorry, Application is experiencing Internal Server Error!"
                        }
                    ]);
                    break;
                default:
                    setSpecificData(data.display_specific);
                    setTypeChange(data.display_specific[0].type);
                    setItemName(data.display_specific[0].item_name);
                    setItemQty(data.display_specific[0].qty);
                    setItemUPrice(data.display_specific[0].unit_price);
                    localStorage.setItem("U-Price",data.display_specific[0].unit_price);
                    setPayStatus(data.display_specific[0].payable);
                    setTrans(data.display_specific[0].transport.split(','));
                    
                    break;
            }
        });
    }


    const SubmitEditItemInfo = async(e)=>{
        e.preventDefault();

        const getTotalPrice = getItemUPrice * getItemQty;

        const formdata = new FormData();

        formdata.append("token", getToken);
        formdata.append("user_id", userId);
        formdata.append("id", itemId);
        formdata.append("item_type", selectType);
        formdata.append("item_name", getItemName);
        formdata.append("quantity", getItemQty);
        formdata.append("payable", getPayStatus);
        formdata.append("price", getItemUPrice);
        formdata.append("total_price", getTotalPrice);
        formdata.append("mode_of_trans", getTrans);


        await axios({
            method:"POST",
            url:"http://127.0.0.1/Projects/php-api/reactCRUD/Update.php",
            data:formdata
        }).then((response)=>{
            // console.log(response.data);
            switch(response.data.status_code)
            {
                case 200:
                    Swal.fire({
                        icon:"success",
                        text:response.data.message,
                        timer:13000
                    });

                    setTimeout(()=>{
                        navigate("/display");
                    }, 4000);
                    break;
                case 500:
                    Swal.fire({
                        icon:"error",
                        text:response.data.message,
                        timer:10000
                    });
                    break;
            }

            if(response.data.token === ""){
                Swal.fire({
                    icon:"info",
                    html:"<span style='color:#ff3333; font-size:22px;'>" + response.data.message + "</span>",
                    timer:15000
                });
                auth.Logout();
            }
        }).catch((err)=>{
            alert("Problem occurred at backend!");
        });
    }



    return (
        <>
            <AddProfile/>

            <div class="CRUD-description">
                <h4>Update Items</h4>
            </div>

            {(()=>{
                if(getSpecificData.length > 0){

                    return(

                            <form class="crud-container" onSubmit={SubmitEditItemInfo}>
                                <div class="fieldContainers">
                                    <span class="crud-txt">Item Type:</span><br/>
                                    <select value={selectType} onChange={(e)=>setTypeChange(e.target.value)} className='crud-dropdown'>
                                        <option vlaue="select">Select</option>
                                        <option value="Electrical">Electrical</option>
                                        <option value="Mechenical">Mechenical</option>
                                        <option value="Chemical">Chemical</option>
                                        <option value="Electronics">Electronics</option>
                                        <option value="Industrial Fasteners">Industrial Fasteners</option>
                                    </select>
                                </div>
                                <div class="fieldContainers">
                                    <span class="crud-txt">Item Name:</span><br/>
                                    <input type="text" name="enter_name" placeholder='Enter Item Name' class="crud-input-field" onChange={(e)=>{setItemName(e.target.value)}} value={getItemName} />
                                </div>
                                <div class="fieldContainers">
                                    <span class="crud-txt">Quantity:</span><br/>
                                    <input type="text" name="enter_qty" placeholder='Enter Item Quantity' class="crud-input-field" onChange={(e)=>{setItemQty(e.target.value)}} value={getItemQty}/>
                                </div>
                                <div class="fieldContainers">
                                    <span class="crud-txt">Payable:</span><br/>
                                    <RadioBtn 
                                        selectedOption={getPayStatus} 
                                        PayStatus={handlePayStatus} 
                                    />
                                </div>
                                <div class="fieldContainers">
                                    <span class="crud-txt">Per Unit Price:</span><br/>
                                    <input 
                                        type="text" 
                                        name="enter_u_price" 
                                        placeholder={(getPayStatus === "Yes") ? "Enter Item Unit Price" : "This Field Disabled Now"} 
                                        class="crud-input-field"
                                        id="crud-input-field" 
                                        onChange={(e)=>{setItemUPrice(e.target.value)}} 
                                        disabled={getPayStatus === "No"} 
                                        value={getItemUPrice}
                                    />
                                </div>
                                <div class="fieldContainers">
                                    <span class="crud-txt">Transport Mode:</span><br/>
                                    <EditCheckBox 
                                        sendArr={getTrans} 
                                        TransVal={setTransVal} 
                                    />
                                </div>
                                <div class="w3-margin-top">
                                    <input type='submit' name='submit' value='submit' class="crud-submit-btn"/>
                                </div>
                            </form> 
    
                    )

                }
                if(getSpecificData.length === 0){
                    return(
                        <>
                            <div class="err_msg">Sorry! Due to the Id mismatching, Data fetch is failed!</div>
                        </>
                    );
                }
                if(getSpecificData.status_code === 500){
                    return(
                        <>
                            <div class="err_msg">{getSpecificData.err_message}</div>
                        </>
                    );
                }
            })()} 

        </>
    );
}


export default Update;