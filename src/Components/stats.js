import React, {useEffect, useState} from 'react';
import '../App.scss';
import axios from 'axios';
import {connect} from 'react-redux';
import * as actionCreators from '../Store/actions/index';
import {deserializeDates} from '../storage';
import {NavLink} from 'react-router-dom';

let dt = new Date();
let utcDate = dt.toUTCString();
let localDay = false;
let axiosResponse;
let allHistoricalUserData;
let arrayOfHistoricalItemNames = [];

const Statistics = props => {

  let [lastDay, setLastDay] = useState();
  let [fullAxiosHistory, setFullAxiosHistory] = useState([]);

  useEffect(()=>{
    if(localStorage.getItem('userId')){
      axios.get('https://habitual-f64a5.firebaseio.com/history'+localStorage.getItem('userId')+'.json')
        .then((response)=> {allHistoricalUserData = (Object.values(response.data))})
        .then(()=>console.log(allHistoricalUserData))
        .then(()=>
          {for (let i of allHistoricalUserData){
            for (let j of i) {
              if (j.completed){
                arrayOfHistoricalItemNames.push(j.name)
              }
            }
          }
          console.log(arrayOfHistoricalItemNames)
        })
      }
  }, [props])

  useEffect(()=>{
    if(axiosResponse != null){
      setFullAxiosHistory(Object.values(axiosResponse))
    }
  }, [axiosResponse])

  useEffect(()=>{
    axios.get('https://habitual-f64a5.firebaseio.com/history'+localStorage.getItem('userId')+'.json')
      .then((response)=>{if(response.data != null){
        if(localStorage.getItem('userId'))
          {axios.get('https://habitual-f64a5.firebaseio.com/history'+localStorage.getItem('userId')+'.json')
            .then((response)=> axiosResponse = response.data)
            .then(()=> localDay = Object.values(axiosResponse).pop())
          }
      }})
  }, [])

  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(token){
    props.signUpRedux(localStorage.getItem('token'),
                        localStorage.getItem('userId'),
                        localStorage.getItem('email'))
    }
  }, [])

  const dayMapper = (day) => {
    const capitalize = (s) => {
      return s.charAt(0).toUpperCase() + s.slice(1)
    };
    return (
      <ul>
        <div className="statListDate">
          {day? day[0].date : null}
        </div>
        {day ?
        day.map((value) =>
          {return (<div key={value.id}>
                    <li
                      className="none">
                      <div>{value.name}: {capitalize(value.completed.toString())}</div>
                    </li>
                  </div>
                  )})
        :null}
      </ul>
    );
  }

  let shortenedSelectedDays;
  let historicalDatesArray = [];

  const historicalDates = () => {
    if(fullAxiosHistory[0] != null){
        for(let i = 0; i < fullAxiosHistory.length; i++){
            historicalDatesArray.push(fullAxiosHistory[i][0].date) ;
        }
    }
    let selectedDaysString = localStorage.getItem('selectedDays')
    let selectedDaysArray = deserializeDates(selectedDaysString)
    shortenedSelectedDays = selectedDaysArray.map(day=>{
        return day.toString().slice(0,15)
    })
  }

  let matches = [];

  const findMatchingDates = (selected, historical) => {
    selected.sort();
    historical.sort();
    for(let i = 0; i < historical.length; i += 1){
        if(selected.indexOf(historical[i]) > -1) {
            matches.push(historical[i]);
        }
    }
  }

  let displayedMatches = [];

  const displayMatchingDates = () => {
    for(let i = 0; i < fullAxiosHistory.length; i++){
        if( matches.indexOf(fullAxiosHistory[i][0].date) > -1 ){
            displayedMatches.push(fullAxiosHistory[i])
        }
    }
  }

  const mappedDay = (day) => {
    let totaler = 0;
    for(let i = 0; i < day.length; i++){
      if(day[i].completed){
        totaler = ++totaler
      }
    }
  return (
    <div key={Math.random().toString()}>
      <div>
        {day ? dayMapper(day) : loaderTimeout()}
        You've completed {totaler} out of {day.length} things!
      </div>
      <div>That's {((totaler/day.length)*100).toFixed(0)}% of things!</div>
    </div>
  );
  }

  const loaderTimeout = () => {
    setTimeout(()=>{return <div className="loader"/>;},500)
  }

  const filteredMapSelectedDays = () => {
    if(displayedMatches[0] == undefined){
      return (
        <div className="centered">
          <div>There is no saved data for these days.</div>
          <div>Go to checklist to save data or click above button to refresh.</div>
        </div>
      )
    } else {
      return displayedMatches.map(s=>{
          return mappedDay(s)
      })
    }
  }

  const redirectToSignin = () => {
    if(props.listReducer == null && !localStorage.getItem('token')){
      return <li
                className="redirectLink">
                <NavLink to="/login">'Login/Signup to use checklist and statistics!'</NavLink>
            </li>
    }
  }

  const renderSignedInPage = () => {
    if(localStorage.getItem('token')){
      return (
        <div className="stats">
          <div>It is currently {utcDate}</div>
          <br/>
          <button onClick={setLastDay}>Get Selected Day's Data</button>
          <br/>
          {historicalDates()}
          {findMatchingDates(shortenedSelectedDays, historicalDatesArray)}
          {displayMatchingDates()}
          {filteredMapSelectedDays()}
        </div>
      )
    }
  }

  return (
    <div>
      <div className="centered">
        {redirectToSignin()}
      </div>
      {renderSignedInPage()}
    </div>
  )
}

const mapStateToProps = state => {
    return {
      loginReducer: state.loginReducer,
    };
  };

const mapDispatchToProps = dispatch => {
  return {
    signUpRedux: (token, userId, email)=> dispatch(actionCreators.signUp(token, userId, email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);