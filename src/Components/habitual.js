import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../Store/actions/index';
import Item from './item';
import {store} from '../index';

const Habitual = props => {

    const checklist = () => {
        return (
            <ul>
            {
            props.listReducer.items.map((val, index) => {
                return (
                <li key={index}
                    className="none">
                    { val }
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
                       onChange={ (event) => props.nameItem(event.target.value) } 
                        />
                &nbsp;&nbsp;
                <button onClick={ () => props.addItem() }
                        type="button" 
                        className="btn btn-outline-dark btn-sm">
                    Add Item
                </button>
                {props.listReducer.items}
            </div>
            {checklist()}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        listReducer: state.listReducer,
    };
  };
  
const mapDispatchToProps = dispatch => {
    const state = store.getState();

    return {
        addItem: () => dispatch(actionCreators.addItem(<Item name={state.listReducer.itemNames.slice(-1)[0]}/>)),
        nameItem: (e) => dispatch(actionCreators.nameItem(e))
    };
  };
  
  
export default connect(mapStateToProps, mapDispatchToProps)(Habitual) ;

