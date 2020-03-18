import React from 'react';
import '../App.css';
import {NavLink} from 'react-router-dom';

const toolbar = () => {
    return (
        <div>
            <ul className="toolbar">
                <li className="link">
                    <NavLink to="/">Home</NavLink>
                </li>
                <li className="link">
                    <NavLink to="/checklist">Checklist</NavLink>
                </li>
                <li className="link">
                    <NavLink to="/statistics">Statistics</NavLink>
                </li>
                <li className="dotlink">
                    <div className="dot"></div>
                </li>
                <div>
                    <li className="rightLink">
                        <NavLink to="/login">Login-Sign Up</NavLink>
                    </li>
                </div>
            </ul>
        </div>
    )
}

export default toolbar;