import React from 'react';
import Item from './Item';

class Store extends React.Component {
    constructor (props){
      super ();
      this.state = {
        totalChecked: 0,
        checked1: false
      };
    }

    addTotal = (childChecked) => {
      childChecked ? 
          this.setState({totalChecked: this.state.totalChecked-1}) :
          this.setState({totalChecked: this.state.totalChecked+1});
    };

    checker = (props) => {
        this.setState({checked1: !this.state.checked1});
        console.log(this.state.checked1);

    };


    render (){
      return (
        <div>
          <Item message="New Item "  checker={this.checker} adder={this.addTotal}/>
          <Item message="New Item "  checker={this.checker} adder={this.addTotal}/>
          <Item message="New Item "  checker={this.checker} adder={this.addTotal}/>
          <div>{this.state.totalChecked}</div>  
        </div>
      );
    }
  }

  export default Store ;