import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../Store/actions/index';
import Item from './item';
import axios from 'axios';
import AppFooter from '../AppFooter';

let name;
let axiosData;
let axiosDays;
let lastAxiosDay;

const Habitual = props => {
    const uploadChecklist = () => {
        axios.get('https://habitual-f64a5.firebaseio.com/history.json')
            .then((response)=> axiosData = response.data)
            .then(()=> axiosDays = Object.keys(axiosData).map((key)=>{return [key, axiosData[key]]}))
            .then(()=> lastAxiosDay = axiosDays[axiosDays.length-1])
            .then(()=>lastAxiosDay[1][0].date === props.listReducer[props.listReducer.length-1].date ? axios.delete('https://habitual-f64a5.firebaseio.com/history/'+ lastAxiosDay[0] +'.json') : console.log(props.listReducer[props.listReducer.length-1].date))
        axios.post('https://habitual-f64a5.firebaseio.com/history.json', props.listReducer);
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
                    {checklist()}
                    <div className="bold2">&nbsp;&nbsp;
                        Defaults:
                    </div>
                    <br/>
                    {/* {this.listDefaults()} */}
                </div>
            </div>
            <div className="centered">
                <AppFooter/>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        listReducer: state.listReducer,
    };
  };
  
const mapDispatchToProps = dispatch => {
    return {
        addItem: (name) => dispatch(actionCreators.addItem(name)),
    };
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(Habitual) ;

