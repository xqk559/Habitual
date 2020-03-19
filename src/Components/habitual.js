import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../Store/actions/index';
import Item from './item';
import axios from 'axios';
import { useLocation } from 'react-router-dom'

let name;
let axiosData;
let axiosDays;
let lastAxiosDay;
let defaults;
let defaultArray = null;
let defaultExecuted = false;
let today = new Date().toString().slice(0,15);
let cleared;



const Habitual = props => {
    const [defaultList, setDefaultList] = useState();
    const [userIdExists, setUserIdExists] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
          if(localStorage.getItem('userId') && defaultArray == null){  
          await axios.get('https://habitual-f64a5.firebaseio.com/defaults'+localStorage.getItem('userId')+'.json')
            .then((response)=> {defaults = (Object.values(response.data))})
            .then(()=> defaultArray = defaults[0])
            .then(()=>console.log(defaultArray))
            .then(()=>{for(let i in defaultArray){
                defaultArray[i].date = today 
                return defaultArray}})
            .then(()=> setDefaultList(defaultArray))
            .then(defaultExecuted = true)
        } 
        };
        fetchData();
      }, [cleared]);

      let location = useLocation()

      useEffect(()=>{
        setUserIdExists(true)
        //refresh()
      }, [userIdExists, props, location])




      useEffect(()=> {
        if(defaultList != null){
            props.addDefaultToState(defaultList); 
      }
    }, [defaultList, localStorage])

      useEffect(()=>{
        if(!localStorage.getItem('userId')){
            props.clearAll()
            cleared = 69;
        }
      }, [localStorage])

      useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token){
        props.signUpRedux(localStorage.getItem('token'),
                           localStorage.getItem('userId'),
                           localStorage.getItem('email'))
        }
        }, [])

    const uploadChecklist = () => {
        if(localStorage.getItem('userId'))
        {
        axios.get('https://habitual-f64a5.firebaseio.com/history'+localStorage.getItem('userId')+'.json')
            .then((response)=> {if(response.data != null){axiosData = response.data}})
            .then(()=> axiosDays = Object.keys(axiosData).map((key)=>{return [key, axiosData[key]]}))
            .then(()=> lastAxiosDay = axiosDays[axiosDays.length-1])
            .then(()=>lastAxiosDay[1][0].date === props.listReducer[props.listReducer.length-1].date 
                ? axios.delete('https://habitual-f64a5.firebaseio.com/history'+localStorage.getItem('userId')+'/'+ lastAxiosDay[0] +'.json') : console.log())
        let fullPost = props.listReducer;
        axios.post('https://habitual-f64a5.firebaseio.com/history'+localStorage.getItem('userId')+'.json', fullPost);
        }
    }

    const uploadDefaultList = () => {
        axios.delete('https://habitual-f64a5.firebaseio.com/defaults'+localStorage.getItem('userId')+'.json');
        axios.post('https://habitual-f64a5.firebaseio.com/defaults'+localStorage.getItem('userId')+'.json', props.listReducer);
    }

    const checklist = () => {
        const capitalizeFirstLetter = string => {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
        return (<ul>
            {props.listReducer.map((val, index) => {return (<li key={index}
                    className="none">
                    { <Item name={capitalizeFirstLetter(val.name)}
                            id={val.id}/> }
                        </li>
                );
            })}
            </ul>
        );
    }

    return (
        <div >
          <div className="rainbow-text">
            Habitual
          </div>
          <div className="rainbow-text-small">
            You've done so many things today!
          </div>
          <br />
            <div className="centered2">
                <input type="text"
                       onChange={(event)=>{name = event.target.value}}
                        />
                &nbsp;&nbsp;
                <button onClick={ () => props.addItem(name) }
                        type="button" 
                        className="btn btn-outline-dark btn-sm">
                    Add Item
                </button>
                &nbsp;
                <button onClick={ () => uploadChecklist() }
                        id= "submitter"
                        type="button"
                        className="btn btn-outline-primary btn-sm">
                Submit Completed Day
                </button>
              &nbsp;
              <button   
                    onClick={ ()=> uploadDefaultList() }
                    type="button" 
                    className="btn btn-outline-dark btn-sm">
                Set as Default
               </button>
            </div>
               <br/>
            <div>
               <div  className="margin">
                    <div className="bold2">&nbsp;&nbsp;
                        To Do:
                    </div>
                    <br />
                    {userIdExists ? checklist():null}
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        listReducer: state.listReducer,
        loginReducer: state.loginReducer,
    };
  };
  
const mapDispatchToProps = dispatch => {
    return {
        addItem: (name) => dispatch(actionCreators.addItem(name)),
        signUpRedux: (token, userId, email)=> dispatch(actionCreators.signUp(token, userId, email)),
        addDefaultToState: (defaults) => dispatch(actionCreators.addDefaultToState(defaults)),
        clearAll: () => dispatch(actionCreators.clearAll()),
    };
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(Habitual) ;