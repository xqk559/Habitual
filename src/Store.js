import React from 'react';
import Item from './Item';
import classes from './App.css';

class Store extends React.Component {
    constructor (props){
      super ();
      this.state = {
        totalChecked: 0
      };
    }

    addTotal = (childChecked) => {
      childChecked ? 
          this.setState({totalChecked: this.state.totalChecked-1}) :
          this.setState({totalChecked: this.state.totalChecked+1});
    };

    render (){
      return (
        <div>
          <h4>You've completed {this.state.totalChecked} things!</h4>
          <br />
          <br />
          <Item message="Eat Vitamins" adder={this.addTotal}/>
          <Item message="Go for a Walk" adder={this.addTotal}/>
          <Item message="Programming" adder={this.addTotal}/>
          <Item message="Ate Vegan" adder={this.addTotal}/>
          <Item message="Ate Vegetarian" adder={this.addTotal}/>
          <Item message="Excercised" adder={this.addTotal}/>
          <Item message="Didn't Drink" adder={this.addTotal}/>
          <Item message="Didn't Smoke" adder={this.addTotal}/>
          <Item message="Lost Weight" adder={this.addTotal}/>
          <Item message="Played Music" adder={this.addTotal}/>
          <Item message="Created Art" adder={this.addTotal}/>
          <br />  
        </div>
      );
    }
  }

  export default Store ;