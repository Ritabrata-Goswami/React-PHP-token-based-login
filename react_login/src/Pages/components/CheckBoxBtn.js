import React, {useEffect, useState} from "react";
import "../../App.css";


const dataObj = [
    {id:1, name:"Road", checked:false},
    {id:2, name:"Rail", checked:false},
    {id:3, name:"Air", checked:false},
    {id:4, name:"Sea", checked:false}
];


const CheckBox = (props) =>{


    return(
        <>
            {dataObj.map((obj)=>(
                <span>
                    <input
                        type="checkbox"
                        name="enter_transport"
                        value={obj.name}
                        onChange={props.TransVal}
                        className="crud-checkbox-btn"
                    />
                    <label className="crud-checkbox-txt">{obj.name}</label>
                </span>
            ))}
        </>
    );
}



const EditCheckBox = (props)=>{
    
    return(
        <>
            {dataObj.map((obj)=>(
                <span>
                    <input
                        type="checkbox"
                        name="enter_transport"
                        value={obj.name}
                        defaultChecked={props.sendArr.includes(obj.name)}
                        onChange={props.TransVal}
                        className="crud-checkbox-btn"
                    />
                    <label className="crud-checkbox-txt">{obj.name}</label>
                </span>
            ))}
        </>
    );
}



export {dataObj}
export {CheckBox, EditCheckBox};