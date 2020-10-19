import React, { useState, useEffect } from "react";
import "../App.scss";
import axios from "axios";
import { connect } from "react-redux";
import * as actionCreators from "../Store/actions/index";
import { useHistory } from "react-router-dom";

interface Props {
  signUpRedux: (token: string | null, user_id: string | null, email: string | null) => void;
}

const Auth = (props: Props) => {
  let [title, setTitle] = useState("Sign Up");
  let [email, setEmail] = useState<string>("");
  let [password, setPassword] = useState<string>();
  let [passwordConfirmer, setPasswordConfirmer] = useState("");
  let [error, setError] = useState<Error | null>(null);

  let history = useHistory();

  const authData = {
    email: email,
    password: password,
    returnSecureToken: true,
  };

  const signUpRedux = props.signUpRedux;
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      signUpRedux(
        localStorage.getItem("token"),
        localStorage.getItem("userId"),
        localStorage.getItem("email")
      );
    }
  }, [signUpRedux]);

  const signUp = () => {
    if (password !== passwordConfirmer) {
      alert("Passwords do not match");
    } else {
      setError(null);
      let url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBaJnlnubPwKJ9WkUJI6szWkCF_b0OomDk";
      let axiosResponse: any;
      axios
        .post(url, authData)
        .then((response) => (axiosResponse = response.data))
        .then(() => localStorage.setItem("token", axiosResponse.idToken))
        .then(() => localStorage.setItem("userId", axiosResponse.localId))
        .then(() => localStorage.setItem("email", authData.email))
        .catch((err) => setError(err.response.data.error))
        .then(() => {
          const [token, userId, email] = [
            localStorage.getItem("token"),
            localStorage.getItem("userId"),
            localStorage.getItem("email")
          ];
          if(token && userId && email){
            props.signUpRedux(
              token,
              userId,
              email);
          }
          history.push("/checklist");
          }
        );
    }
  };

  const login = () => {
    setError(null);
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBaJnlnubPwKJ9WkUJI6szWkCF_b0OomDk";
    let axiosResponse: any;
    axios
      .post(url, authData)
      .then((response) => (axiosResponse = response.data))
      .then(() => localStorage.setItem("token", axiosResponse.idToken))
      .then(() => localStorage.setItem("userId", axiosResponse.localId))
      .then(() => localStorage.setItem("email", authData.email))
      .catch((err) => setError(err.response.data.error))
      .then(() => {
        if (localStorage.getItem("token")) {
          props.signUpRedux(
            localStorage.getItem("token"),
            localStorage.getItem("userId"),
            localStorage.getItem("email")
          );
          history.push("/checklist");
        }
      });
  };

  const switchSignUpLogin = () => {
    if (title === "Sign Up") {
      setTitle("Login");
    } else if (title === "Login") {
      setTitle("Sign Up");
    }
  };

  const errorChecker = () => {
    if (error != null) {
      return <div className="centered">Error: {error.message}</div>;
    }
  };

  const confirmPassword = () => {
    if (title === "Sign Up") {
      return (
        <div>
          <input
            type="password"
            className="loginInput"
            placeholder="Confirm Password"
            onChange={(event) => setPasswordConfirmer(event.target.value)}
            autoComplete="off"
          />
        </div>
      );
    }
  };

  useEffect(() => {
    const listener = (event: any) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        if (title === "Sign Up") {
          signUp();
        } else {
          login();
        }
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  });

  return (
    <div className="flex">
      <div className="centered">
        <h1 className="loginPage">{title}</h1>
        <form>
          <div className="loginButtons">
            <input
              type="text"
              className="loginInput"
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="loginButtons">
            <input
              type="password"
              className="loginInput"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="off"
            />
          </div>
          <div className="loginButtons">{confirmPassword()}</div>
          <br />
          <button
            id="signupButton"
            type="button"
            onClick={title === "Sign Up" ? () => signUp() : () => login()}
            className="btn btn-outline-dark btn-sm"
            style={{ width: 70 }}
          >
            {title}
          </button>
        </form>
        <div className="loginPage">
          <br />
          <button
            type="button"
            onClick={() => switchSignUpLogin()}
            className="btn btn-outline-primary btn-sm"
          >
            {title === "Sign Up"
              ? "Already have an account? Login here"
              : "Need to sign up? Sign up here"}
          </button>
        </div>
      </div>
      {errorChecker()}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    loginReducer: state.loginReducer,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    signUpRedux: (token: any, userId: any, email: any) =>
      dispatch(actionCreators.signUp(token, userId, email)),
    logoutRedux: (token: any, userId: any) =>
      dispatch(actionCreators.logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
