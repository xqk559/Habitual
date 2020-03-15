import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../Store/actions/index';
import Item from './item';

const Habitual = props => {
    return (
        <div>
            <div className="centered">
                <button onClick={ () => props.addItem() }
                    type="button" 
                    className="btn btn-outline-dark btn-sm">
                    Add Item
                </button>
                {props.listReducer.items}
            </div>
            <ul>
            {
            props.listReducer.items.map((val, index) => {
                return (
                <li key={index}
                    className="none">
                    { <Item /> }
                </li>
                );
            })
            }
            </ul>
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
        addItem: () => dispatch(actionCreators.addItem(<Item/>)),
    };
  };
  
  
export default connect(mapStateToProps, mapDispatchToProps)(Habitual) ;

