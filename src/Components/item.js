import React from 'react';
import {connect} from 'react-redux';
import * as actionCreators from '../Store/actions/index';
import '../App.css';

const Item = props => {
    return (
        <div className ="item">
          <div className="col-md-12">
            <input type="checkbox"
                    onClick={()=>props.checkboxClicked(props.id)}/>
                &nbsp;{props.name}
                <button type="button"
                        className="close"
                        aria-label="Close"
                        onClick={()=>props.removeItem(props.id)}>
                  <span aria-hidden="true">&times;</span>
                </button>
          </div>
                <hr className="hr"/>
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
        checkboxClicked: (id) => dispatch(actionCreators.checkboxClicked(id)),
        removeItem: (id) => dispatch(actionCreators.removeItem(id)),
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(Item);