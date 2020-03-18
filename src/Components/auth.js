import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';
import {connect} from 'react-redux';

let email;
let password;

const Auth = () => {

    let [title, setTitle] = useState("Sign Up")

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
    
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
    }

    const switchSignUpLogin = () => {
        if (title === "Sign Up") {
            setTitle("Login")
        } else if (title === "Login") {
            setTitle("Sign Up") 
        }
    }

    return (
        <div>
            <h1 className="stats">{title}</h1>
            <div className="loginButtons">
                <input type="text" 
                    className="loginInput" 
                    placeholder="Email"
                    onChange={event=>email=event.target.value}/>
                <button onClick={()=>login()}
                        className="btn btn-outline-dark btn-sm">
                            {title}
                </button>
            </div>
            <div className="loginButtons">
                <input type="text" 
                    className="loginInput" 
                    placeholder="Password"
                    onChange={event=>email=event.target.value}/>
                <button onClick={()=>logout()}
                        className="btn btn-outline-danger btn-sm">
                            Logout
                </button>
            </div>
            <br/>
            <div className="stats">
            <button onClick={()=>switchSignUpLogin()}
                    className="btn btn-outline-primary btn-sm">
                        Switch Login/Signup
            </button>
            </div>
        </div>
    );
}

export default Auth;