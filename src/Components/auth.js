import React, { useState, useEffect } from 'react';
import '../App.scss';
import axios from 'axios';
import {connect} from 'react-redux';
import * as actionCreators from '../Store/actions/index';
import {useHistory} from 'react-router-dom';

const Auth = props => {

  let [title, setTitle] = useState("Sign Up");
  let [email, setEmail] = useState();
  let [password, setPassword] = useState();
  let [error, setError] = useState(null);
  let [update, setUpdate] = useState();

  let history = useHistory();

  const authData = {
      email: email,
      password: password,
      returnSecureToken: true
  };

  useEffect(()=>{
      const token = localStorage.getItem('token');
      if(token){
      props.signUpRedux(localStorage.getItem('token'),
                        localStorage.getItem('userId'),
                        localStorage.getItem('email'))
      }
  }, [])

  const signUp = () => {
    setError(null);
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBaJnlnubPwKJ9WkUJI6szWkCF_b0OomDk';
    let axiosResponse;
    const post = axios.post(url, authData)
        .then(response=>axiosResponse=response.data)
        .then(()=>localStorage.setItem('token', axiosResponse.idToken))
        .then(()=>localStorage.setItem('userId', axiosResponse.localId))
        .then(()=>localStorage.setItem('email', authData.email))
        .catch(err=>setError(err.response.data.error))
        .then(()=>{if(localStorage.getItem('token')){
                    props.signUpRedux(localStorage.getItem('token'),
                                      localStorage.getItem('userId'),
                                      localStorage.getItem('email'));
                    history.push("/checklist")
            }})
  }

  const login = () => {
    setError(null);
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBaJnlnubPwKJ9WkUJI6szWkCF_b0OomDk';
    let axiosResponse;
    const post = axios.post(url, authData)
      .then(response=>axiosResponse=response.data)
      .then(()=>localStorage.setItem('token', axiosResponse.idToken))
      .then(()=>localStorage.setItem('userId', axiosResponse.localId))
      .then(()=>localStorage.setItem('email', authData.email))
      .catch(err=>setError(err.response.data.error))
      .then(()=>{if(localStorage.getItem('token')){
        props.signUpRedux(localStorage.getItem('token'),
                          localStorage.getItem('userId'),
                          localStorage.getItem('email'));
        history.push("/checklist")
      }})
  }

  const logout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('email');
      setUpdate('updated');
      props.logoutRedux();
  }

  const switchSignUpLogin = () => {
      if (title === "Sign Up") {
          setTitle("Login")
      } else if (title === "Login") {
          setTitle("Sign Up")
      }
  }

  const errorChecker = () => {
      if (error) {
          return (
              <div className="centered">
                  Error: {error.message}
              </div>
          )
      }
  }

  const confirmPassword = () => {
    if(title == "Sign Up"){
      return <div className="loginButtons">
               <input
                  type="password"
                  className="loginInput"
                  placeholder="Confirm Password"
                  onChange={event=>setPassword(event.target.value)}/>
               <button
                  className="transparent"
                  style={{width: 70}}>
               </button>
             </div>
    }
  }

  return (
    <div>
      <h1 className="loginPage">{title}</h1>
      <div className="loginButtons">
        <input
          type="text"
          className="loginInput"
          placeholder="Email"
          onChange={event=>setEmail(event.target.value)}/>
        <button
          onClick={title === "Sign Up"
                    ? ()=>signUp()
                    : ()=>login()}
                  className="btn btn-outline-dark btn-sm"
                  style={{width: 70}}>
                    {title}
        </button>
      </div>
      <div className="loginButtons">
        <input
          type="password"
          className="loginInput"
          placeholder="Password"
          onChange={event=>setPassword(event.target.value)}/>
        <button
          className="transparent"
          style={{width: 70}}>
            Logout
        </button>
      </div>
      <div className="loginButtons">
        {confirmPassword()}
      </div>
      <br/>
      <div className="loginPage">
      <button
        onClick={()=>switchSignUpLogin()}
        className="btn btn-outline-primary btn-sm">
          Switch Login/Signup
      </button>
      </div>
      {errorChecker()}
    </div>
  );
}

const mapStateToProps = state => {
    return {
        loginReducer: state.loginReducer,
    };
  };

const mapDispatchToProps = dispatch => {
    return {
        signUpRedux: (token, userId, email)=> dispatch(actionCreators.signUp(token, userId, email)),
        logoutRedux: (token, userId)=> dispatch(actionCreators.logout(token, userId)),
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(Auth);