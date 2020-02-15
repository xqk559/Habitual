import React from 'react';
import '../App.css';
import Lister from '../Containers/Lister';
import axios from 'axios';
import {Route, NavLink, Switch, Redirect} from 'react-router-dom';

let dt = new Date();
let utcDate = dt.toUTCString();

let axiosDefaults = require('axios/lib/defaults');
axiosDefaults.baseURL = 'https://habitual-f64a5.firebaseio.com';

class Store extends React.Component {
    constructor (props){
      super ();
      this.state = {
        bool: false,
        dynamicNames: {},
        totalChecked: 0,
        dynamicTotal: 0,
        trueTotal: 0,
        newItem: "",
        submitted: true,
        date: utcDate,
      };
    }

    booler = (checked) => {
      //console.log(checked);
      this.setState({bool: checked},()=>console.log(this.state.bool));
    }

    dynamicNamer = (passedName) => {
      this.setState({dynamicNames:{...this.state.dynamicNames,[passedName]: this.state.bool}},
                    ()=>console.log(passedName),console.log(this.state.bool));
    }

    callbackTotalAdder = (dynamic) => {
      this.setState({},()=>
      {
        this.setState({dynamicTotal: dynamic},()=>this.setState({trueTotal: this.state.totalChecked + this.state.dynamicTotal}))
      })
    }

    addTotal = (childChecked) => {
      !childChecked ?
          this.setState({totalChecked: this.state.totalChecked-1}, ()=>this.setState({trueTotal: this.state.totalChecked + this.state.dynamicTotal})) :
          this.setState({totalChecked: this.state.totalChecked+1}, ()=>this.setState({trueTotal: this.state.totalChecked + this.state.dynamicTotal}));
    };

    submitHider() {
      document.getElementById("submitter").disabled=this.state.submitted;
  };

    undoHider() {
      document.getElementById("undo").disabled=!this.state.submitted;
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
      this.setState({submitted: !this.state.submitted},
                     () => console.log());
      this.submitHider();
      this.undoHider();
      let dt = new Date();
      let utcDate = dt.toUTCString();
      const test = {
                    ADate: utcDate,
                    Completed: this.state.trueTotal,
                   };
      const post = Object.assign({},this.state.dynamicNames) ;
      const fullPost = Object.assign(post, test);
      axios.post('https://habitual-f64a5.firebaseio.com/history.json', fullPost);
    };

    fakeBooler = () => {

    }

    test = () => {
      return <div>FUCK</div>
    } 

    render (){
      return (
        <div>
          <div className="centered">
            <div>You've completed {this.state.trueTotal} things! &nbsp;
              <button onClick={this.submitHandler}
                      id= "submitter"
                      type="button"
                      className="btn btn-outline-primary btn-sm">
                Submit Completed Day
              </button>
              &nbsp;
              <button id="undo"
                      disabled={this.state.submitted}
                      onClick={this.undoHandler}
                      type="button"
                      className="btn btn-outline-danger btn-sm">
                Undo
              </button>
            </div>
            <br />
            <br />
            <br />
            </div>
            <div className="none">
              <Lister addTotal={this.callbackTotalAdder}
                      namer={this.dynamicNamer}
                      booleroo={this.booler}/>
            </div>
        </div>
      );
    }
  }

  export default Store ;