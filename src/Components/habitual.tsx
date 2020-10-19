import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../Store/actions/index";
import Item from "./item";
import axios from "axios";
import "../App.scss";
import { NavLink } from "react-router-dom";
// import { History } from "./barchart";

let today = new Date().toString().slice(0, 15);
let name: string;

// interface Props {

// }

export const Habitual = (props: any) => {
  const [defaults, setDefaults] = useState([]);
  const [canSaveDay, setCanSaveDay] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (localStorage.getItem("userId")) {
        await axios
          .get(
            "https://habitual-f64a5.firebaseio.com/defaults" +
              localStorage.getItem("userId") +
              ".json"
          )
          .then((response) => {
            if (response.data != null) {
              let responseDefaults: any = Object.values(response.data)[0];
              responseDefaults[0].date = today;
              setDefaults(responseDefaults);
            }
          });
      }
    };
    fetchData();
  }, []);

  const addDefaultToState = props.addDefaultToState;
  useEffect(() => {
    if (defaults != null) {
      addDefaultToState(defaults);
    }
  }, [defaults, addDefaultToState]);

  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      props.clearAll();
    }
  }, [props]);

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

  const uploadChecklist = () => {
    if (props.listReducer !== []) {
      setCanSaveDay(true);
      let fullPost = props.listReducer.map((day: any) => {
        day.date = today;
        return day;
      });
      if (localStorage.getItem("userId")) {
        axios
          .get(
            "https://habitual-f64a5.firebaseio.com/history" +
              localStorage.getItem("userId") +
              ".json"
          )
          .then((response) => {
            if (response.data != null) {
              const axiosData = response.data;
              const axiosDays = Object.keys(axiosData).map((key) => {
                return [key, axiosData[key]];
              });
              const lastAxiosDay = axiosDays[axiosDays.length - 1];
              if (
                lastAxiosDay[1][0].date ===
                props.listReducer[props.listReducer.length - 1].date
              ) {
                axios.delete(
                  "https://habitual-f64a5.firebaseio.com/history" +
                    localStorage.getItem("userId") +
                    "/" +
                    lastAxiosDay[0] +
                    ".json"
                );
              }
            }
            axios.post(
              "https://habitual-f64a5.firebaseio.com/history" +
                localStorage.getItem("userId") +
                ".json",
              fullPost
            );
          });
      }
      alert(
        "Today's data has been submitted! Refresh page if you want to change today's data."
      );
    }
  };

  const uploadDefaultList = () => {
    axios.delete(
      "https://habitual-f64a5.firebaseio.com/defaults" +
        localStorage.getItem("userId") +
        ".json"
    );
    axios.post(
      "https://habitual-f64a5.firebaseio.com/defaults" +
        localStorage.getItem("userId") +
        ".json",
      props.listReducer
    );
  };

  const checklist = () => {
    return (
      <ul className="marginBottom2">
        {props.listReducer.map((val: any, index: any) => {
          return (
            <li key={index} className="none">
              {<Item name={val.name} id={val.id} />}
            </li>
          );
        })}
      </ul>
    );
  };

  const redirectToSignin = () => {
    if (props.listReducer.length === 0 && !localStorage.getItem("token")) {
      return (
        <li className="redirectLink">
          <NavLink to="/login">
            'Login/Signup to use checklist and statistics!'
          </NavLink>
        </li>
      );
    }
  };

  const signedInPage = () => {
    if (localStorage.getItem("token")) {
      return (
        <div>
          <div className="headerText">Habitual</div>
          <div className="headerTextSmall">
            You've done so many things today!
          </div>
          <br />
          <div className="centered2">
            <input
              type="text"
              onChange={(event) => {
                name = event.target.value;
              }}
            />
            &nbsp;&nbsp;
            <button
              onClick={() => props.addItem(name)}
              type="button"
              className="btn btn-outline-dark btn-sm"
              title="Add a new habit to your current list"
            >
              Add New Habit
            </button>
            &nbsp; &nbsp;
            <button
              style={{ margin: 10 }}
              onClick={() => uploadDefaultList()}
              type="button"
              className="btn btn-outline-dark btn-sm"
              title="Set this list as your daily habit list every time you sign in"
            >
              Set Current List as Default
            </button>
          </div>
          <br />
          <div>
            <div className="centered" style={{ marginBottom: 50 }}>
              <button
                disabled={canSaveDay}
                onClick={() => uploadChecklist()}
                id="submitter"
                type="button"
                className="btn btn-outline-primary btn-sm"
                title="Save this list once completed so you can view statistics (Overwrites other data for today)"
              >
                Update Today's Checklist
              </button>
            </div>
            <div className="margin">
              <div className="bold2">&nbsp;&nbsp; To Do:</div>
              <br />
              {checklist()}
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      {signedInPage()}
      <div className="absoluteCentered">{redirectToSignin()}</div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    listReducer: state.listReducer,
    loginReducer: state.loginReducer,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addItem: (name: any) => dispatch(actionCreators.addItem(name)),
    signUpRedux: (token: any, userId: any, email: any) =>
      dispatch(actionCreators.signUp(token, userId, email)),
    addDefaultToState: (defaults: any) =>
      dispatch(actionCreators.addDefaultToState(defaults)),
    clearAll: () => dispatch(actionCreators.clearAll()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Habitual);
