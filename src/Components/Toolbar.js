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
                <li className="rightLink">
                    <NavLink to="/login">Login</NavLink>
                </li>
                <li className="link">
                    <NavLink to="/redux">Redux</NavLink>
                </li>
            </ul>
        </div>
    )
}

export default toolbar;