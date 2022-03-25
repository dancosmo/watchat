import React from "react";
import AuthProvider from "./components/context/auth";
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from './components/MyNavbar';
import Home from './components/Home';
import Register from "./components/Register";
import LogIn from "./components/LogIn";
import Messenger from "./components/Messenger";
import Profile from "./components/Profile";


function App() {
  return (
    <AuthProvider>
        <BrowserRouter>
        <MyNavbar/>
            <Routes>
                <Route exact path="/" element={<Home/>}></Route> 
                <Route exact path="/register" element={<Register/>}></Route>
                <Route exact path="/login" element={<LogIn/>}></Route>
                <Route exact path="/messenger" element={<Messenger/>}></Route>
                <Route exact path="/profile" element={<Profile/>}></Route>
            </Routes>
        </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
