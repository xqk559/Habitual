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


let item2 = <Item message="Programmed" />;
let item3 = <Item message="Went for a Walk" />;
let item4 = <Item message="Ate Vitamins" />;

let allTheThings = [item2, item3, item4];


    export default Item ;