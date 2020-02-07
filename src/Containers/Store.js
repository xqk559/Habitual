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
        bool: false,
        dynamicNames: [],
        swappedNamesKeys: {},
        totalChecked: 0,
        dynamicTotal: 0,
        trueTotal: 0,
        newItem: "",
        submitted: true,
        date: utcDate,
        history: 1,
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

    booler = (argument) => {
      this.setState({bool: argument},()=>console.log(this.state.bool));
    }

    dynamicNamer = (passedName) => {
      let name = this.state.dynamicNames;
      let pushed = name.push(passedName);
      let newName = this.state.dynamicNames;
      let newObj = {};
      for (var prop in newName) {
        if(newName.hasOwnProperty(prop)) {
            var value = newName[prop];
          newObj[value] = prop;

          newObj[passedName] = this.state.bool;

      }
      this.setState({swappedNamesKeys: newObj});
    }}

    callbackTotalAdder = (dynamic) => {
      this.setState({},()=>{
        this.setState({dynamicTotal: dynamic},()=>this.setState({trueTotal: this.state.totalChecked + this.state.dynamicTotal}))
      })
    }

    addTotal = (childChecked) => {
      !childChecked ? 
          this.setState({totalChecked: this.state.totalChecked-1}, ()=>this.setState({trueTotal: this.state.totalChecked + this.state.dynamicTotal})) :
          this.setState({totalChecked: this.state.totalChecked+1}, ()=>this.setState({trueTotal: this.state.totalChecked + this.state.dynamicTotal}));
    };

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

    undoHandler = () => {
      this.setState({submitted: !this.state.submitted});
      this.submitHider();
      let d;
      let keys;
      let leng;
      let last;
      axios.get('https://habitual-f64a5.firebaseio.com/history.json')
          .then((response)=> d = response.data)
            .then(()=> keys = Object.keys(d))
              .then(()=> leng = keys.length)
                .then(()=> last = keys[leng-1])
                  .then(()=>axios.delete('https://habitual-f64a5.firebaseio.com/history/'+(last)+'.json'));
    }

    submitHandler = () => {
      this.setState({submitted: !this.state.submitted, 
                     history: this.state.history + 1},
                     () => console.log());
      this.submitHider();
      this.undoHider();
      let dt = new Date();
      let utcDate = dt.toUTCString();
      const names = this.state.dynamicNames;
      const test = {Vitamin: this.state.vitamin, 
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
                    Completed: this.state.totalChecked};
      const post = Object.assign({},this.state.swappedNamesKeys) ;
      const fullPost = Object.assign(post, test);
      console.log(fullPost);
      axios.post('https://habitual-f64a5.firebaseio.com/history.json', fullPost)
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
        <div className="centered">
          <div>You've completed {this.state.trueTotal} things! &nbsp;
            <button onClick={this.submitHandler}
                    id= "submitter"
                    type="button" 
                    class="btn btn-outline-primary btn-sm">
              Submit Completed Day
            </button>
            &nbsp;
            <button id="undo"
                    disabled={this.state.submitted}
                    onClick={this.undoHandler}
                    type="button" 
                    class="btn btn-outline-danger btn-sm">
              Undo
            </button>
          </div>
          <br />
          <button onClick={this.hider}
                  type="button" 
                  class="btn btn-outline-secondary btn-sm"> 
          Defaults
          </button>
          <br />
          <br />
          <p className="none">
            <Lister addTotal={this.callbackTotalAdder} 
                    namer={this.dynamicNamer}
                    booleroo={this.booler}/>
          </p>
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