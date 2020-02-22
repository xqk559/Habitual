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

    dynamicNamer = (passedName, checked) => 
    {
      this.setState({dynamicNames:{...this.state.dynamicNames,[checked]: passedName}},()=>console.log(checked, passedName));
    };
     
    callbackTotalAdder = (dynamic) => 
    {
      this.setState({},()=>
      {
        this.setState({dynamicTotal: dynamic},()=>this.setState({trueTotal: this.state.totalChecked + this.state.dynamicTotal}))
      })
    }

    addTotal = (childChecked) => 
    {
      this.setState({totalChecked: this.state.totalChecked + (childChecked ? 1 : -1)},
       () => this.setState({trueTotal: this.state.totalChecked + this.state.dynamicTotal}));
    };

    submitHandler = () => 
    {
      this.setState({submitted: !this.state.submitted},
                     () => console.log());
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
      let lastDay;
      let currentDay;
      let leng;
      let last;
      let keys;
      axios.get('https://habitual-f64a5.firebaseio.com/history.json')
        .then((response)=> d = response.data)
        .then(()=> result =  Object.keys(d).map((key)=>{return [key, d[key]]}))
        .then(()=>length = result.length -1)
        .then(()=>lastPost= result[length][1])
        .then(()=>lastPostValues = Object.values(lastPost))
        .then(()=>lastDay= (lastPostValues[0][0]+''+
                            lastPostValues[0][1]+''+
                            lastPostValues[0][2]+''+
                            lastPostValues[0][3]+''+
                            lastPostValues[0][4]+''+
                            lastPostValues[0][5]+''+
                            lastPostValues[0][6]))
        .then(()=>currentDay= utcDate[0]+''+
                               utcDate[1]+''+
                               utcDate[2]+''+
                               utcDate[3]+''+
                               utcDate[4]+''+
                               utcDate[5]+''+
                               utcDate[6])
        .then(console.log(currentDay))
        .then(()=> keys = Object.keys(d))
        .then(()=> leng = keys.length)
        .then(()=> last = keys[leng-1])
        .then(()=>lastDay===currentDay ? axios.delete('https://habitual-f64a5.firebaseio.com/history/'+(last)+'.json') : console.log("naw"))
        .then(()=>console.log(lastDay))
        .then(axios.post('https://habitual-f64a5.firebaseio.com/history.json', fullPost));
      };

    fakeBooler = () => {}

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