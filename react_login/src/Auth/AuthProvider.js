import React, {useContext, createContext, useEffect, useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'


const AuthContext = createContext();

const AuthProvider = ({children}) =>{
    const [userId, setUserId] = useState( localStorage.getItem("getUserId") || "");
    const [token, setToken] = useState(localStorage.getItem("getToken") || "");

    const navigate = useNavigate();

    const fetchUserData = async(formdata) =>{
        await fetch(
            //login endpoint
            "http://127.0.0.1/Projects/php-api/reactCRUD/Login.php",
            {
              method:"POST",
              body:formdata
            }
        ).then(
            //get correct json response
            (data)=>{
                return data.json();
            }
        ).then(
            //set user State
            (data)=>{
                
                switch(data.get_login_data[0].status_code){
                    case 200:
                        // console.log(data);
                        // console.log("name:- " + data.get_login_data[0].hash_id);
                        // console.log("token:- " + data.get_login_data[0].token);
                        setUserId(data.get_login_data[0].hash_id);
                        setToken(data.get_login_data[0].token);
                        localStorage.setItem("getToken",data.get_login_data[0].token);
                        localStorage.setItem("getUserId",data.get_login_data[0].hash_id);
                        navigate("/add-data");
                        break;
                    case 404:
                        Swal.fire({
                            icon:"error",
                            title: 'Login Failed!',
                            text:JSON.parse(JSON.stringify(data.get_login_data[0].message)),
                            timer:10000
                        });
                        break;
                }
            }
        ).catch(
            //err response
            (err)=>{
                console.log(err);
                alert("Something wrong happened in backend!");
                return "";
            }
        );
    }

    const Logout = ()=>{
      setToken("");
      setUserId("");
      localStorage.removeItem("getToken");
      localStorage.removeItem("getUserId");
      localStorage.removeItem("U-Price");
      navigate("/login");
    }


    return(
        <AuthContext.Provider value={{ userId, token, fetchUserData, Logout }}>
          {children}
        </AuthContext.Provider>
    );
}


export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};




// import { useContext, createContext, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem("site") || "");
//   const navigate = useNavigate();
//   const loginAction = async(data) => {
//     try {
//       const response = await fetch("http://127.0.0.1/Projects/php-api/reactCRUD/Login.php", {
//         method:"POST",
//         // headers: {
//         //   "Content-Type": "application/json",
//         // },
//         body:data,
//       });
//       const res = await response.json();
//       console.log(res);
//       console.log("name:- " + res.get_login_data[0].user_name);
//       console.log("token:- " + res.get_login_data[0].token);
//       if (res) {
//         // setUser(res.get_login_data.user_name);
//         // setToken(res.get_login_data.token);
//         // localStorage.setItem("site", "eyJ0eXBlIjoiSldUIiwiYWxnb3JpdGhlbSI6IkhTMjU2IiwiZXhwIjoxNzE0NzQ3MzM5fQ.eyJ1c2VyX2lkIjoiamFuaWRvZUBnbWFpbC5jb20iLCJ1c2VyX25hbWUiOiJKYW5pIERvZSJ9.0hRbyHURWkTctTrOiRBTiwVDLK3SQKrYWHfK-RZ9LeE");
//         // navigate("/add-data");
//         // return;
//       }
//       throw new Error(res.message);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const logOut = () => {
//     setUser(null);
//     setToken("");
//     localStorage.removeItem("site");
//     navigate("/login");
//   };

//   return (
//     <AuthContext.Provider value={{ token, user, loginAction, logOut }}>{children}</AuthContext.Provider>
//   );

// };

// export default AuthProvider;

// export const useAuth = () => {
//   return useContext(AuthContext);
// };