import React, {useContext, createContext, useEffect, useState} from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from '../Auth/AuthProvider';


const PrivateRoute = () =>{
    const gettoken = useAuth();

    if(!gettoken.token){
        return <Navigate to="/login" />;
    }
    return <Outlet />;
}

export default PrivateRoute;