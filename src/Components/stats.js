import React, {useEffect, useState} from 'react';
import '../App.css';
import axios from 'axios';
import {connect} from 'react-redux';
import * as actionCreators from '../Store/actions/index';

let dt = new Date();
let utcDate = dt.toUTCString();
let localDay = false;

const Statistics = props => {
    let [lastDay, setLastDay] = useState();

    useEffect(()=>{
        let axiosResponse;
        axios.get('https://habitual-f64a5.firebaseio.com/history'+localStorage.getItem('userId')+'.json')
            .then((response)=> axiosResponse = response.data)
            .then(()=> localDay = Object.values(axiosResponse).pop())
            .then(()=>console.log(localDay))
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
          }
        return (<ul>
            {localDay ? 
             localDay.map((value, index) => 
                {return (<li key={index}
                            className="none">
                            <div>{value.name}: {capitalize(value.completed.toString())}</div> 
                        </li>
                        )})
             :null}
            </ul>
        );
    }

    return (
        <div className="stats">
            <div>It is currently {utcDate}</div>
            <button onClick={setLastDay}>Get Today's Data</button>
            <div>
                {localDay ? dayMapper() : null}
                You've completed out of {localDay.length} things!
            </div>
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