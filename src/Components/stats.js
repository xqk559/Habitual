import React, {useEffect, useState} from 'react';
import '../App.css';
import axios from 'axios';
import {connect} from 'react-redux';
import * as actionCreators from '../Store/actions/index';
import {deserializeDates} from '../storage';

let dt = new Date();
let utcDate = dt.toUTCString();
let localDay = false;
let axiosResponse;
let filteredHist

const Statistics = props => {
    let [lastDay, setLastDay] = useState();
    let [totalCompleted, setTotalCompleted] = useState(0);
    let [fullAxiosHistory, setFullAxiosHistory] = useState([]);
    useEffect(()=>{
        if(axiosResponse != null){
            setFullAxiosHistory(Object.values(axiosResponse))
        }
    }, [axiosResponse])
    useEffect(()=>{
        if(localStorage.getItem('userId'))
            {axios.get('https://habitual-f64a5.firebaseio.com/history'+localStorage.getItem('userId')+'.json')
                .then((response)=> axiosResponse = response.data)
                .then(()=> localDay = Object.values(axiosResponse).pop())
                .then(()=>
                    {if(localDay)
                        {
                            {for(let i = 0; i < localDay.length; i++)
                                {
                                    if(localDay[i].completed)
                                    {
                                    setTotalCompleted(++totalCompleted)
                                    }
                                }
                            }
                        }
                    })
                }    
    }, [])

    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token){
        props.signUpRedux(localStorage.getItem('token'),
                           localStorage.getItem('userId'),
                           localStorage.getItem('email'))
        }
    }, [])
    
    const dayMapper = () => {
        const capitalize = (s) => {
            return s.charAt(0).toUpperCase() + s.slice(1)
          };
        return (
            <ul>
                <div className="statListDate">    
                    {localDay? localDay[0].date : null}
                </div>
                {localDay ? 
                localDay.map((value) => 
                    {return (<div>
                                <li key={value.id}
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

    const allDates = () => {
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
        //console.log(historicalDatesArray)
        //console.log(shortenedSelectedDays)
    }


    const findMatchingDates = (selected, historical) => {
        let matches = [];
        selected.sort();
        historical.sort();
        for(let i = 0; i < historical.length; i += 1){
            if(selected.indexOf(historical[i]) > -1) {
                matches.push(historical[i]);
            }
        }
        console.log(matches)
    }

    const selectedDayFilter = (selectedDay) => {
        // if(fullAxiosHistory[0] != null){
        //     for(let i = 0; i < fullAxiosHistory.length; i++){
        //         return selectedDay;
        //     }
        // }
        return selectedDay.date;
    }

    const filteredHistory = () => {
        if(fullAxiosHistory[0] != null){
            filteredHist = fullAxiosHistory.filter(selectedDayFilter);
            //console.log(filteredHist)
        }
    }



    
    return (
        <div className="stats">
            <div>It is currently {utcDate}</div>
            <br/>
            <button onClick={setLastDay}>Get Selected Day's Data</button>
            <br/>
            <div>
                {localDay ? dayMapper() : null}
                You've completed {totalCompleted} out of {localDay.length} things!
            </div>
            <div>That's {((totalCompleted/localDay.length)*100).toFixed(0)}% of things!</div>
            {/* {fullAxiosHistory ? console.log((fullAxiosHistory.filter(selectedDayFilter))[0]) : null} */}
            {/* {fullAxiosHistory[0] ? console.log(fullAxiosHistory[0][0].date) : null} */}
            {filteredHistory()}
            {allDates()}
            {findMatchingDates(shortenedSelectedDays, historicalDatesArray)}
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