import React from 'react';
import Item from './Item';

class Store extends React.Component {
    constructor (props){
      super ();
      this.state = {
        totalChecked: 0,
        checked: false
      };
    }

    addTotal = (props) => {
        this.props.checked ? this.setState({totalChecked: +1}) : this.setState({totalChecked: -1});
    };

    checker = (props) => {
        this.props.checked ? this.setState({checked: true}) : this.setState({checked: false});
    };


    render (){
      return (
        <div>
        <Item message="New Item " checked={this.state.checked} checker={this.checker} adder={this.addTotal}/>
        <div>{this.state.totalChecked}</div>  
        </div>
      );
    }
  }

  export default Store ;