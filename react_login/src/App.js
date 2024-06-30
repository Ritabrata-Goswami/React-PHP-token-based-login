// import logo from './logo.svg';
import './App.css';
import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';

import CreateUsre from './Pages/Registration';
import Intro from './Pages/Introduction';
import AddData from './Pages/Add';
import Display from './Pages/Display';
import Update from './Pages/Update';
import Login from './Pages/Login';
import AuthProvider from './Auth/AuthProvider';
import PrivateRoute from './Auth/PrivateRoute';

import NotFound from './Pages/Notfound';



function App() {
  return (
    <div>
        
        
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route element={<NotFound/>} path="*"/>
              <Route element={<Intro />} path='/'/>
              <Route element={<CreateUsre />} path='/registration'/>
              <Route element={<Login/>} path='/login'/>
              <Route element={<PrivateRoute />}>
                <Route element={<AddData/>} path='/add-data'/>
                <Route element={<Display />} path='/display' />
                <Route element={<Update/>} path='/edit/:itemId/:userId'/>
              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
    </div>
  );
}

export default App;
