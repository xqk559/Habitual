import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../Store/actions/index';
import Item from './item';
import axios from 'axios';

let name;

const Habitual = props => {

    const uploadChecklist = () => {
        axios.post('https://habitual-f64a5.firebaseio.com/history.json', props.listReducer)
    }

    const checklist = () => {
        return (
            <ul>
            {
            props.listReducer.map((val, index) => {
                return (
                <li key={index}
                    className="none">
                    { <Item name={val.name}
                            id={val.id} /> }
                </li>
                );
            })
            }
            </ul>
        );
    }

    return (
        <div>
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
                <button onClick={ () => props.removeItem() }
                        type="button" 
                        className="btn btn-outline-danger btn-sm">
                Remove Last Item
                </button>
                &nbsp;
                <button onClick={ () => uploadChecklist() }
                        id= "submitter"
                        type="button"
                        className="btn btn-outline-primary btn-sm">
                Submit Completed Day
              </button>
                {props.listReducer.items}
            </div>
            {checklist()}
            {console.log(name)}
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
        removeItem: () => dispatch(actionCreators.removeItem()),
    };
  };
  
  
export default connect(mapStateToProps, mapDispatchToProps)(Habitual) ;

