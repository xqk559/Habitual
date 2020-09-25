import React from "react";
import "../App.scss";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

const Toolbar = (props) => {
  const clearLocalStorage = () => {
    localStorage.removeItem("auth");
  };

  const logoutButton = () => {
    return (
      <div>
        <li className="rightLink" onClick={clearLocalStorage}>
          <NavLink to="/logout">Logout</NavLink>
        </li>
      </div>
    );
  };

  const showToolbar = () => {
    if (localStorage.getItem("token")) {
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
            {props.loginReducer[0].token ? (
              <li className="dotlink">
                <div className="dot"></div>
              </li>
            ) : null}
            <li className="username">{props.loginReducer[0].email}</li>
            <div>
              <li className="rightLink">
                <NavLink to="/login">Login-Sign Up</NavLink>
              </li>
            </div>
            {localStorage.getItem("token") ? logoutButton() : null}
          </ul>
        </div>
      );
    } else {
      return null;
    }
  };

  return showToolbar();
};

const mapStateToProps = (state) => {
  return {
    loginReducer: state.loginReducer,
  };
};

export default connect(mapStateToProps)(Toolbar);
