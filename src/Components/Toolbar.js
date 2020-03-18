import React from 'react';
import '../App.css';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';

const Toolbar = props => {
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
                {localStorage.getItem('token') 
                ? <div>
                    <li className="dotlink">
                        <div className="dot"></div>
                    </li>
                    <li className="username">
                        {localStorage.getItem('email')}
                    </li>
                  </div>
                : null}
                <div>
                    <li className="rightLink">
                        <NavLink to="/login">Login-Sign Up</NavLink>
                    </li>
                </div>
            </ul>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        loginReducer: state.loginReducer,
    };
  };

export default connect(mapStateToProps)(Toolbar);