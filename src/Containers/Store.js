import React from 'react';
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
        dynamicNames: {},
        totalChecked: 0,
        dynamicTotal: 0,
        trueTotal: 0,
        newItem: "",
        submitted: true,
        date: utcDate,
      };
    }

    dynamicNamer = (passedName, checked) => {
      this.setState({dynamicNames:{...this.state.dynamicNames,[checked]: passedName}},()=>console.log(checked, passedName));
    };
     
    callbackTotalAdder = (dynamic) => {
      this.setState({},()=>
      {
        this.setState({dynamicTotal: dynamic},()=>this.setState({trueTotal: this.state.totalChecked + this.state.dynamicTotal}))
      })
    }

    addTotal = (childChecked) => {
      this.setState({totalChecked: this.state.totalChecked + (childChecked ? 1 : -1)},
       () => this.setState({trueTotal: this.state.totalChecked + this.state.dynamicTotal}));
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
      let d;
      let result;
      let dt = new Date();
      let utcDate = dt.toUTCString();
      console.log(utcDate);
      const test = {
                    AAAAADate: utcDate,
                    AAAACompleted: this.state.trueTotal,
                   };
      const post = Object.assign({},this.state.dynamicNames) ;
      const fullPost = Object.assign(post, test);
      let length;
      let lastPost;
      let lastPostValues;
      axios.get('https://habitual-f64a5.firebaseio.com/history.json')
        .then((response)=> d = response.data)
        .then(()=> result =  Object.keys(d).map((key)=>{return [key, d[key]]}))
        .then(()=>length = result.length -1)
        .then(()=>lastPost= result[length][1])
        .then(()=>lastPostValues = Object.values(lastPost))
        .then(()=>console.log(lastPostValues[0][0]+''+
                              lastPostValues[0][1]+''+
                              lastPostValues[0][2]+''+
                              lastPostValues[0][3]+''+
                              lastPostValues[0][4]+''+
                              lastPostValues[0][5]+''+
                              lastPostValues[0][6]
                              )
             )
        .then(axios.post('https://habitual-f64a5.firebaseio.com/history.json', fullPost));
    };

    fakeBooler = () => {

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
                      />
            </div>
        </div>
      );
    }
  }

  export default Store ;