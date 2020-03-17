import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';

let email;
let password;

const Auth = () => {

    const authData = {
        email: email,
        password: password,
        returnSecureToken: true
    };
    const login = () => {
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBaJnlnubPwKJ9WkUJI6szWkCF_b0OomDk';
    let axiosResponse;
    const post = axios.post(url, authData)
        .then(response=>axiosResponse=response.data)
        .then(()=>localStorage.setItem('token', axiosResponse.idToken))
        .then(()=>localStorage.setItem('userId', axiosResponse.localId))
    }
    let [title, setTitle] = useState("Login")
    
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
    }

    return (
        <div className="stats">
            <h1 className="stats">{title}</h1>
            <input type="text" 
                   className="loginInput" 
                   placeholder="Email"
                   onChange={event=>email=event.target.value}/>
            <input type="text" 
                   className="loginInput" 
                   placeholder="Password"
                   onChange={event=>password=event.target.value}/>
            <button onClick={()=>login()}>{title}</button>
            <button onClick={()=>logout()}>Logout</button>
        </div>
    );
}

export default Auth;