import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../Store/actions/index";
import "../App.scss";

interface Props {
  checkboxClicked: any,
  removeItem: any,
  name: any,
  id: number
}

const Item = (props: Props) => {
  return (
    <div className="item">
      <div className="col-md-12">
        <input
          type="checkbox"
          onClick={() => props.checkboxClicked(props.id)}
        />
        &nbsp;{props.name}
        <button
          type="button"
          className="close"
          aria-label="Close"
          onClick={() => props.removeItem(props.id)}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <hr className="hr" />
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    listReducer: state.listReducer,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    checkboxClicked: (id: number) => dispatch(actionCreators.checkboxClicked(id)),
    removeItem: (id: number) => dispatch(actionCreators.removeItem(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);
