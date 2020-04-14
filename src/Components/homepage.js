import React from 'react';
import {NavLink} from 'react-router-dom';
import '../App.scss';
import AppFooter from '../AppFooter';

const Homepage = () => {

  const redirectToSignin = () => {
    return <li
              className="redirectLink">
              <NavLink to="/login">Login/Signup to use checklist and statistics!</NavLink>
          </li>
  }

  return (
    <div className="marginHomepage">
      <div className="rainbow-text">
        Habitual
      </div>
      <div className="rainbow-text-small">
        You've done so many things today!
      </div>
      <div
        style={{marginTop: 50}}
        className="centered">
          Habitual is an open source Habit Tracker using React and Redux.
      </div>
      <div
        className="centered">
          Click the button below to sign up and get started!
      </div>
      <div
        style={{margin: 75}}
        className="centered">
        {redirectToSignin()}
      </div>
    </div>
  )
}

export default Homepage;