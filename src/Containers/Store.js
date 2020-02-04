import React from 'react';
import Item from './Item';
import ItemAdder from '../Components/ItemAdder';
import '../App.css';
import NewItem from '../Components/NewItem';
import Lister from '../Containers/Lister';
import axios from 'axios';

class Store extends React.Component {
    constructor (props){
      super ();
      this.state = {
        totalChecked: 0,
        newItem: "",
          vitamin: false,
          walk: false,
          program: false,
          vegan: false,
          vegetarian: false,
          excercised: false,
          drink: false,
          smoke: false,
          weight: false,
          music: false,
          art: false,
          meditate: false
      };
    }

    addTotal = (childChecked) => {
      childChecked ? 
          this.setState({totalChecked: this.state.totalChecked-1}) :
          this.setState({totalChecked: this.state.totalChecked+1});
    };

    // addItem = (inputVal) => {
    //   const capitalizer = (s) => {
    //     return s.charAt(0).toUpperCase() + s.slice(1)
    //   }
    //   const capitalized = capitalizer(inputVal)
    //   this.setState({newItem: capitalized})
    // };
    
    hider() {
        var x = document.getElementById("myDIV");
        if (x.style.display === "none") {
          x.style.display = "block";
        } else {
          x.style.display = "none";
        }
    };

    // totaler = (argument) => {
    //   this.setState({totalChecked: argument})
    // };

    submitHandler = () => {
      const test = {Vitamin: this.state.vitamin, 
                    Walk: this.state.walk}
      axios.post('https://habitual-f64a5.firebaseio.com/history.json', test);
    }; 

    defaultHandler = ( defaultState ) => {
      this.setState({vitamin: !defaultState})
      console.log("Vitamin is " + JSON.stringify(this.state.vitamin))
    };

    walkHandler = ( defaultState ) => {
      this.setState({walk: !defaultState})
      console.log("Walk is " + JSON.stringify(this.state.walk))
    };

    render (){

      return (
        <div>
          <h4>You've completed {this.state.totalChecked} things! &nbsp;
            <button onClick={this.submitHandler}>Submit Completed Day</button>
          </h4>
          <button onClick={this.hider}>Defaults</button>
          <br />
          <br />
          <div>
            <Lister  />
          </div>
          <br />
          <div className="hidden" id="myDIV">
          <Item message="Ate Vitamins" adder={this.addTotal} status={this.defaultHandler}/>
          <Item message="Went for a Walk" adder={this.addTotal} status={this.walkHandler}/>
          <Item message="Programming" adder={this.addTotal}/>
          <Item message="Did Chores" adder={this.addTotal}/>
          <Item message="Ate Vegan" adder={this.addTotal}/>
          <Item message="Ate Vegetarian" adder={this.addTotal}/>
          <Item message="Exercised" adder={this.addTotal}/>
          <Item message="Didn't Drink" adder={this.addTotal}/>
          <Item message="Didn't Smoke" adder={this.addTotal}/>
          <Item message="Lost Weight" adder={this.addTotal}/>
          <Item message="Played Music" adder={this.addTotal}/>
          <Item message="Created Art" adder={this.addTotal}/>
          <Item message="Meditated" adder={this.addTotal}/>
          </div>
          <br />  
        </div>
      );
    }
  }

  export default Store ;