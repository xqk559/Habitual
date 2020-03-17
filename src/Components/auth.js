import React, { useState } from 'react';
import '../App.css';

const Auth = () => {

    let [title, setTitle] = useState("Login, motherfucker:")

    return (
        <div className="stats">
            <h1>{title}</h1>
            <input type="text"/>
            <input type="text"/>
        </div>
    );
}

export default Auth;