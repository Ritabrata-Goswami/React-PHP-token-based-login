import React from "react";
import "../../App.css";


const RadioBtn = (props) =>{
    const dataObj = [
        {id:1, name:"Yes", checked:false},
        {id:2, name:"No", checked:false}
    ];


    return(
        <>
            {
                dataObj.map((Obj)=>(
                    <span className="crud-radio-btn">
                        <input 
                            type="radio" 
                            value={Obj.name} 
                            checked={props.selectedOption === Obj.name} 
                            onChange={props.PayStatus} 
                        /> {Obj.name}
                    </span>
                ))
            }
        </>
    );
}

export default RadioBtn;