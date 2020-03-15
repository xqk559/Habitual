import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../Store/actions/index';

const Habitual = props => {
    return (
        <div className="centered">
            <button onClick={ () => props.addItem() }
                type="button" 
                className="btn btn-outline-dark btn-sm">
                Add Item
            </button>
            {console.log(props.listReducer.items)}
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
        addItem: () => dispatch(actionCreators.addItem('cock')),
    };
  };
  
  
export default connect(mapStateToProps, mapDispatchToProps)(Habitual) ;

