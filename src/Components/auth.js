import React, { useState } from 'react';
import '../App.css';

const Auth = () => {
    let [title, setTitle] = useState("Login")
    return (
        <div className="stats">
            <h1 className="stats">{title}</h1>
            <input type="text" className="loginInput" placeholder="Email"/>
            <input type="text" className="loginInput" placeholder="Password"/>
        </div>
    );
}

export default Auth;