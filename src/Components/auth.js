import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';

const Auth = () => {

    const authData = {
        email: 'email@email.com',
        password: 'password',
        returnSecureToken: true
    };
    const login = () => {
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBaJnlnubPwKJ9WkUJI6szWkCF_b0OomDk';

    const post = axios.post(url, authData)

    .then(response=>localStorage.setItem('token', response.data.idToken))
    //.then(localStorage.setItem('expirationDate', expirationDate))
    .then(response=>localStorage.setItem('userId', response.data.localId))
    //.then(console.log(post));
    }
    let [title, setTitle] = useState("Login")
    
    return (
        <div className="stats">
            <h1 className="stats">{title}</h1>
            <input type="text" className="loginInput" placeholder="Email"/>
            <input type="text" className="loginInput" placeholder="Password"/>
            <button onClick={login()}>{title}</button>
        </div>
    );
}

export default Auth;