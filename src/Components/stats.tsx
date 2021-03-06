import React, { useEffect, useState } from "react";
import "../App.scss";
import axios from "axios";
import { connect } from "react-redux";
import * as actionCreators from "../Store/actions/index";
import { deserializeDates } from "../storage";
import { NavLink } from "react-router-dom";
import BarChart2 from "./barchart2";

interface IStatsProps {
  completedItemPairs: any,
  signUpRedux: any,
  selectedItemPairs: any,
  listReducer: any
}

const Statistics = (props: IStatsProps) => {
  let displayedMatches: any[] = [];

  let [fullAxiosHistory, setFullAxiosHistory] = useState<any[]>([]);

  const uniqueCheck = (a: any) => {
    let seen: any = {};
    return a.filter((item: any) => {
      return seen.hasOwnProperty(item) ? false : (seen[item] = true);
    });
  };

  const completedItemPairs = props.completedItemPairs;

  useEffect(() => {
    let allHistoricalUserData: any[] = [];
    let historicalItemNames: any[] = [];
    let completedItemLengths = [];
    let completedPairs: any = {};

    if (localStorage.getItem("userId")) {
      axios
        .get(
          "https://habitual-f64a5.firebaseio.com/history" +
            localStorage.getItem("userId") +
            ".json"
        )
        .then((response) => {
          if (response.data !== null && response.data !== undefined) {
            allHistoricalUserData = Object.values(response.data);
          }
        })

        .then(() => {
          for (let i of allHistoricalUserData) {
            for (let j of i) {
              if (j.completed) {
                historicalItemNames.push(j.name);
              }
            }
          }
          let uniqueNames = uniqueCheck(historicalItemNames);
          for (let uniqueName of uniqueNames) {
            completedPairs[uniqueName] = historicalItemNames.filter(
              (name) => name === uniqueName
            ).length;
            completedItemLengths.push(completedPairs[uniqueName]);
          }
        })
        .then(() => completedItemPairs(completedPairs));
    }
  }, [completedItemPairs]);

  useEffect(() => {
    axios
      .get(
        "https://habitual-f64a5.firebaseio.com/history" +
          localStorage.getItem("userId") +
          ".json"
      )
      .then((response) => {
        if (response.data != null) {
          if (localStorage.getItem("userId")) {
            axios
              .get(
                "https://habitual-f64a5.firebaseio.com/history" +
                  localStorage.getItem("userId") +
                  ".json"
              )
              .then((response) =>
                setFullAxiosHistory(Object.values(response.data))
              );
          }
        }
      });
  }, []);

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

  const dayMapper = (day: any) => {
    return (
      <ul>
        <div className="statListDate">{day ? day[0].date : null}</div>
        {day
          ? day.map((value: any) => {
              return (
                <div key={value.id}>
                  <li className="none">
                    <div>
                      {value.name}: {value.completed.toString()}
                    </div>
                  </li>
                </div>
              );
            })
          : null}
      </ul>
    );
  };

  let shortenedSelectedDays: any;
  let historicalDatesArray: any[] = [];

  const historicalDates = () => {
    if (fullAxiosHistory[0] != null) {
      for (let i = 0; i < fullAxiosHistory.length; i++) {
        historicalDatesArray.push(fullAxiosHistory[i][0].date);
      }
    }
    let selectedDaysString = localStorage.getItem("selectedDays");
    let selectedDaysArray = deserializeDates(selectedDaysString);
    shortenedSelectedDays = selectedDaysArray.map((day: any) => {
      return day.toString().slice(0, 15);
    });
  };

  let matches: any[] = [];

  const findMatchingDates = (selected: any, historical: any) => {
    selected.sort();
    historical.sort();
    for (let i = 0; i < historical.length; i += 1) {
      if (selected.indexOf(historical[i]) > -1) {
        matches.push(historical[i]);
      }
    }
  };

  const displayMatchingDates = () => {
    for (let i = 0; i < fullAxiosHistory.length; i++) {
      if (matches.indexOf(fullAxiosHistory[i][0].date) > -1) {
        displayedMatches.push(fullAxiosHistory[i]);
      }
    }
  };

  const mappedDay = (day: any) => {
    let totaler = 0;
    for (let i = 0; i < day.length; i++) {
      if (day[i].completed) {
        totaler = ++totaler;
      }
    }

    if (!day) loaderTimeout()

    return (
      <div className="marginBottom" key={Math.random().toString()}>
        <div key={Math.random().toString()} className="centered5">
          <div>{day ? dayMapper(day) : ""}</div>
          <div className="centered4">
            You've completed {totaler} out of {day.length} things!
          </div>
          <div className="centered4">
            That's {((totaler / day.length) * 100).toFixed(0)}% of things!
          </div>
        </div>
      </div>
    );
  };

  const loaderTimeout = () => {
    setTimeout(() => {
      return <div className="loader" />;
    }, 500);
  };

  const filteredMapSelectedDays = () => {
    let selectedItemNames: any[] = [];
    let selectedItemLengths: any[] = [];
    let selectedCompletedPairs: any = {};


    for (let i of displayedMatches) {
      for (let j of i) {
        if (j.completed) {
          selectedItemNames.push(j.name);
        }
      }
    }
    let uniqueNames2 = uniqueCheck(selectedItemNames);
    for (let uniqueName2 of uniqueNames2) {
      selectedCompletedPairs[uniqueName2] = selectedItemNames.filter(
        (name) => name === uniqueName2
      ).length;
      selectedItemLengths.push(selectedCompletedPairs[uniqueName2]);
    }

    props.selectedItemPairs(selectedCompletedPairs);

    if (displayedMatches.length === undefined || 0) {
      return (
        <div className="centered">
          <div>There is no saved data for these days.</div>
          <div>
            Go to checklist to save data or click above button to refresh.
          </div>
        </div>
      );
    } else {
      return displayedMatches.map((s) => {
        return mappedDay(s);
      });
    }
  };

  const redirectToSignin = () => {
    if (props.listReducer == null && !localStorage.getItem("token")) {
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
    let dt = new Date();
    let utcDate = dt.toUTCString();
    if (localStorage.getItem("token")) {
      return (
        <div className="stats">
          <div>It is currently {utcDate}</div>
          <br />
          <div>To select different days, refresh the page</div>
          <br />
          <div>
            <BarChart2 />
          </div>
          {historicalDates()}
          {findMatchingDates(shortenedSelectedDays, historicalDatesArray)}
          {displayMatchingDates()}
          {filteredMapSelectedDays()}
        </div>
      );
    }
  };

  return (
    <div>
      <div className="centered">{redirectToSignin()}</div>
      {signedInPage()}
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
    completedItemPairs: (completePairs: any) =>
      dispatch(actionCreators.completedItemPairs(completePairs)),
    selectedItemPairs: async (selectedPairs: any) =>
      dispatch(actionCreators.selectedItemPairs(selectedPairs)),
    signUpRedux: (token: any, userId: any, email: any) =>
      dispatch(actionCreators.signUp(token, userId, email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
