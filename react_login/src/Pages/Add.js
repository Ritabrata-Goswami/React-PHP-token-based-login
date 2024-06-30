import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import {useAuth} from '../Auth/AuthProvider';
import '../App.css';

import AddProfile from './components/Profile';
import RadioBtn from './components/RadioBtn';
import {CheckBox, dataObj} from './components/CheckBoxBtn';
import ExportUserId from './components/UserId';



const GetAuth = ()=>{
    const auth = useAuth();
    return auth;
}


const AddData = () => {
    const [selectType, setTypeChange] = useState("select");
    const [getItemName, setItemName] = useState("");
    const [getItemQty, setItemQty] = useState("");
    const [getItemUPrice, setItemUPrice] = useState("");
    const [getPayStatus, setPayStatus] = useState("Yes");
    const [getTrans, setTrans] = useState([]);

    const handlePayStatus = (e) =>{
        setPayStatus(e.target.value);
        if(e.target.value === "No"){
            setItemUPrice(0);
        }else{
            setItemUPrice("");
        }
    }

    const auth = GetAuth();

    function setTransVal(e){
        if(e.target.checked){
            setTrans([...getTrans, e.target.value]);
        }else{
            setTrans(getTrans.filter((val)=> val !== e.target.value));
        }
    }

    const hashed_id=auth.userId;
    const getProfileId = ExportUserId(`http://127.0.0.1/Projects/php-api/reactCRUD/Fetch_user_details.php?user_hash_id=${hashed_id}`).id;

    const SubmitItemInfo = async(e) =>{
        e.preventDefault();

        const getToken = auth.token;
        const getTotalPrice = getItemUPrice * getItemQty;

        const formdata = new FormData();

        formdata.append("token", getToken);
        formdata.append("user_id", getProfileId);
        formdata.append("item_type", selectType);
        formdata.append("item_name", getItemName);
        formdata.append("quantity", getItemQty);
        formdata.append("payable", getPayStatus);
        formdata.append("price", getItemUPrice);
        formdata.append("total_price", getTotalPrice);
        formdata.append("mode_of_trans", getTrans);


        if(selectType !=="select" && getItemName !=="" && getItemQty !=="" && getItemUPrice !=="" && getTrans.length !== 0){
            await axios({
                method:"POST",
                url:"http://127.0.0.1/Projects/php-api/reactCRUD/Data_add.php",
                data:formdata
            }).then((res)=>{
                switch(JSON.parse(JSON.stringify(res)).data.status_code)
                {
                    case 200:
                        Swal.fire({
                            icon:"success",
                            text:JSON.parse(JSON.stringify(res)).data.message,
                            timer:10000
                        });
                        break;
                    case 500:
                        Swal.fire({
                            icon:"error",
                            text:JSON.parse(JSON.stringify(res)).data.message,
                            timer:10000
                        });
                        break;
                }
    
                if(JSON.parse(JSON.stringify(res)).data.token === ""){
                    Swal.fire({
                        icon:"info",
                        html:"<span style='color:#ff3333; font-size:22px;'>" + JSON.parse(JSON.stringify(res)).data.message + "</span>",
                        timer:13000
                    });
                    auth.Logout();
                }
            }).catch((err)=>{
                alert(err);
            });
        }

    }

    return(
        <>
            <AddProfile />

            <div class="CRUD-description">
                <h4>Add Item Data</h4>
                <p class="mini-crud-description">Every fields are mandatory</p>
            </div>
            <form class="crud-container" onSubmit={SubmitItemInfo}>
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
                    <input type="text" name="enter_name" placeholder='Enter Item Name' class="crud-input-field" onChange={(e)=>{setItemName(e.target.value)}}/>
                </div>
                <div class="fieldContainers">
                    <span class="crud-txt">Quantity:</span><br/>
                    <input type="text" name="enter_qty" placeholder='Enter Item Quantity' class="crud-input-field" onChange={(e)=>{setItemQty(e.target.value)}}/>
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
                    <CheckBox 
                        TransVal={setTransVal} 
                    />
                </div>
                <div class="w3-margin-top">
                    <input type='submit' name='submit' value='submit' class="crud-submit-btn"/>
                </div>
            </form>
        </>
    );
}

export default AddData;