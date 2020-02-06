import React from 'react';
import Item from './Item';
import '../App.css';
import Lister from '../Containers/Lister';
import axios from 'axios';

let dt = new Date();
let utcDate = dt.toUTCString();

let axiosDefaults = require('axios/lib/defaults');
axiosDefaults.baseURL = 'https://habitual-f64a5.firebaseio.com';

class Store extends React.Component {
    constructor (props){
      super ();
      this.state = {
        totalChecked: 0,
        newItem: "",
        submitted: true,
        date: utcDate,
        history: 1,
        iterator: 1,
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

    submitHider() {
      var x = document.getElementById("submitter").disabled=this.state.submitted;
  };

    undoHider() {
      var x = document.getElementById("undo").disabled=!this.state.submitted;
  };

    // totaler = (argument) => {
    //   this.setState({totalChecked: argument})
    // };

    undoHandler = () => {
      this.setState({submitted: !this.state.submitted});
      this.submitHider()
      const lastPost = this.state.history - 1;
      axios.delete('https://habitual-f64a5.firebaseio.com/history'+lastPost+'.json');
    }

    submitHandler = () => {
      this.setState({submitted: !this.state.submitted, 
                     history: this.state.history + 1},
                     () => console.log());
      this.submitHider();
      this.undoHider();
      let dt = new Date();
      let utcDate = dt.toUTCString();
      const test = {Day:{Vitamin: this.state.vitamin, 
                    Walk: this.state.walk,
                    Program: this.state.program,
                    Chore: this.state.chore,
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
                    Completed: this.state.totalChecked}};
      let i = 1 ;
      let d;
      let keys;
      let leng;
      axios.post('https://habitual-f64a5.firebaseio.com/history'+this.state.history+'.json', test);
      axios.post('https://habitual-f64a5.firebaseio.com/iterator.json', i);
      axios.get('https://habitual-f64a5.firebaseio.com/iterator.json')
        .then((response)=> d = response.data)
          .then(()=> keys = Object.keys(d))
            .then(()=> leng = keys.length)
              .then(()=>console.log(keys[leng-1]));
        
    }; 

    defaultHandler = ( defaultState ) => {
      this.setState({vitamin: !defaultState})
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
            <button onClick={this.submitHandler}
                    id= "submitter"
                    className="buttonMargin">
              Submit Completed Day
            </button>
            
            <button id="undo"
                    disabled={this.state.submitted}
                    onClick={this.undoHandler}>
              Undo
            </button>
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