import logo from './logo.svg';
import './App.css';
import React from "react";
import {BrowserRouter, Route, Routes, Link, Navigate} from "react-router-dom";

import Paperbase from './components/Paperbase';
import SignUp from './components/sign-components/SignUp';
import SignIn from './components/sign-components/SignIn';
import AdminSignUp from './components/sign-components/AdminSignUp';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn/>}></Route>
          <Route path="/signup" element={<SignUp/>}></Route>
          <Route path="/adminsignup" element={<AdminSignUp/>}></Route>
          <Route path="/paperbase" element={<Paperbase/>}></Route>
          <Route path="*" element={<Navigate to="signin"/>}></Route>
        </Routes>
      </BrowserRouter>   
    </div>
  );
}

export default App;
