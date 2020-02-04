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
          exercised: false,
          drink: false,
          smoke: false,
          weight: false,
          music: false,
          art: false,
          meditate: false,
          chore: false
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
      let dt = new Date();
      let utcDate = dt.toUTCString();
      const test = {Vitamin: this.state.vitamin, 
                    Walk: this.state.walk,
                    Program: this.state.program,
                    Chore: this.state.hore,
                    Vegan: this.state.vegan,
                    Vegetarian: this.state.vegetarian,
                    Exercised: this.state.excercised,
                    Drink: this.state.drink,
                    Smoke: this.state.smoke,
                    Weight: this.state.weight,
                    Music: this.state.music,
                    Art: this.state.art,
                    Meditate: this.state.meditate,
                    ADate: utcDate,
                    Completed: this.state.totalChecked}
      axios.post('https://habitual-f64a5.firebaseio.com/history.json', test);
    }; 

    defaultHandler = ( defaultState ) => {
      this.setState({vitamin: !defaultState})
      console.log("Vitamin is " + JSON.stringify(this.state.vitamin))
    };

    walkHandler = ( defaultState ) => {
      this.setState({walk: !defaultState})
    };

    programHandler = ( defaultState ) => {
      this.setState({program: !defaultState})
    };
    
    choreHandler = ( defaultState ) => {
      this.setState({chore: !defaultState})
    };

    veganHandler = ( defaultState ) => {
      this.setState({vegan: !defaultState})
    };

    vegetarianHandler = ( defaultState ) => {
      this.setState({vegetarian: !defaultState})
    };

    exercisedHandler = ( defaultState ) => {
      this.setState({exercised: !defaultState})
    };

    drinkHandler = ( defaultState ) => {
      this.setState({drink: !defaultState})
    };

    smokeHandler = ( defaultState ) => {
      this.setState({smoke: !defaultState})
    };

    weightHandler = ( defaultState ) => {
      this.setState({weight: !defaultState})
    };

    musicHandler = ( defaultState ) => {
      this.setState({music: !defaultState})
    };

    artHandler = ( defaultState ) => {
      this.setState({art: !defaultState})
    };

    meditateHandler = ( defaultState ) => {
      this.setState({meditate: !defaultState})
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
          <Item message="Programming" adder={this.addTotal} status={this.programHandler}/>
          <Item message="Did Chores" adder={this.addTotal} status={this.choreHandler}/>
          <Item message="Ate Vegan" adder={this.addTotal} status={this.veganHandler}/>
          <Item message="Ate Vegetarian" adder={this.addTotal} status={this.vegetarianHandler}/>
          <Item message="Exercised" adder={this.addTotal} status={this.exercisedHandler}/>
          <Item message="Didn't Drink" adder={this.addTotal} status={this.drinkHandler}/>
          <Item message="Didn't Smoke" adder={this.addTotal} status={this.smokeHandler}/>
          <Item message="Lost Weight" adder={this.addTotal} status={this.weightHandler}/>
          <Item message="Played Music" adder={this.addTotal} status={this.musicHandler}/>
          <Item message="Created Art" adder={this.addTotal} status={this.artHandler}/>
          <Item message="Meditated" adder={this.addTotal} status={this.meditateHandler}/>
          </div>
          <br />  
        </div>
      );
    }
  }

  export default Store ;