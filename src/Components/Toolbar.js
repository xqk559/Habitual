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
                {props.loginReducer[0].token 
                ? <li className="dotlink">
                    <div className="dot"></div>
                  </li>
                : null}
                <li className="username">
                {props.loginReducer[0].email}
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

const mapStateToProps = state => {
    return {
        loginReducer: state.loginReducer,
    };
  };

export default connect(mapStateToProps)(Toolbar);