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

    const post = axios.post(url, authData)

    .then(response=>localStorage.setItem('token', response.data.idToken))
    //.then(response=>console.log(response.data.idToken))
    //.then(localStorage.setItem('expirationDate', expirationDate))
    //.then(response=>localStorage.setItem('userId', response.data.localId))
    //.then(response=>console.log(response.data));
    }
    let [title, setTitle] = useState("Login")
    
    const logout = () => {
        localStorage.removeItem('token');
        //localStorage.removeItem('expirationDate');
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