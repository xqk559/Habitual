import React, { Component } from 'react';

class Item extends React.Component {
    constructor (props){
      super ();
  
      this.state = {
        checked: false,
        quantityChecked: 0
      };
  
      this.handleClick = this.handleClick.bind(this);    
    }
    handleClick (e){
      this.setState({
        checked: !this.state.checked
      });
  
      this.setState({
        quantityChecked: this.state.quantityChecked + 1 
      });  
  
    }
    
  render (){
    let text = this.state.checked ? <strike>{this.props.message}</strike> : this.props.message;
    return (
        <div className="row">
          <div className="col-md-12">
            <input type="checkbox" onClick={this.handleClick} />&nbsp;{text}
            <hr />
          </div>
        </div>
    );
  }
}

    export default Item ;