import React, { Component } from 'react';
import Item from './Item';
import '../App.css';
import axios from 'axios';
  
export default class Lister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalChecked: 0,
      inputValue: '',
      items: [],
      message: 'message',
      defaults: {object: 69},
      axiosdefaults: {},
    }
  }

  booler = (bool) => {
    this.props.booleroo(bool);
  }

  addTotal = (childChecked) =>  {
    this.setState({},()=>{
      if (childChecked) { 
        this.setState({totalChecked: this.state.totalChecked + 1},()=>this.props.addTotal(this.state.totalChecked));
        } 
        else {
        this.setState({totalChecked: this.state.totalChecked - 1},()=>this.props.addTotal(this.state.totalChecked));
        };
    })
  };

  onInputChange(e) {
    const capitalizer = (s) => {
          return s.charAt(0).toUpperCase() + s.slice(1)
        }
        const capitalized = capitalizer(e.target.value)
    this.setState({
      inputValue: capitalized,
    });
  }

  messager = (messager) => {
    this.setState({message: messager},()=>this.props.namer(this.state.message));
  }

  addItem() {
    let items = this.state.items;
    items.push(<Item message={this.state.inputValue} 
                     adder={this.addTotal}
                     booler={this.booler}
                     messager={this.messager}/>);
    this.setState({items});
  }

  removeItem() {
    let items = this.state.items;
    items.pop();
    this.setState({items},()=>console.log());
  }
 
  listItems() {
    let items = this.state.items;
    return (
      <ul>
        {
          items.map((val, index) => {
            return (
              <li key={index}
                  className="none">
                { val }
              </li>
            );
          })
        }
      </ul>
    );
  }

  defaultHandler = () => {
    this.setState({defaults: this.listItems()});
    let defaults = this.state.defaults;

    let d;
    let keys;
    let leng;
    let last;
    // axios.post('https://habitual-f64a5.firebaseio.com/defaults.json', defaults);
    // axios.post('https://habitual-f64a5.firebaseio.com/defaults.json', defaults);
    // axios.post('https://habitual-f64a5.firebaseio.com/defaults.json', defaults);
    axios.get('https://habitual-f64a5.firebaseio.com/defaults.json')
        .then((response)=> d = response.data)
          .then(()=> keys = Object.keys(d))
            .then(()=> leng = keys.length)
              .then(()=> last = keys[leng-1])
                .then(()=>axios.delete('https://habitual-f64a5.firebaseio.com/defaults/'+(last)+'.json'))
                  .then(axios.post('https://habitual-f64a5.firebaseio.com/defaults.json', defaults));
  }


  render() {
    // let d;
    // let keys;
    // let leng;
    // let last;
    // let lastDefault;
    // let defaultArray;
    // axios.get('https://habitual-f64a5.firebaseio.com/defaults.json')
    //     .then((response)=> d = response.data)
    //       .then(()=> keys = Object.keys(d))
    //         .then(()=> leng = keys.length)
    //           .then(()=> last = keys[leng-1])
    //             .then(()=>axios.get('https://habitual-f64a5.firebaseio.com/defaults/'+(last)+'.json'))
    //               .then((response)=>lastDefault = response.data)
    //                 .then(()=>defaultArray = Object.keys(lastDefault).map(function(key){return [Number(key), lastDefault[key]]}))
    //                   .then(()=>console.log(defaultArray))
                    //     .then(()=>this.state.axiosdefaults = defaultArray)
                    //       .then(()=>console.log(this.state.axiosdefaults));
    return (
      <div>
        <div className="centered2">
        <input type="text" onChange={ (e) => this.onInputChange(e) } />
        &nbsp;&nbsp;&nbsp;
        <button onClick={ () => this.addItem() }
                type="button" 
                className="btn btn-outline-dark btn-sm">
          Add Item
        </button>
        &nbsp;
        <button onClick={ () => this.removeItem() }
                type="button" 
                className="btn btn-outline-danger btn-sm">
          Remove Last Item
        </button>
        &nbsp;
        <button onClick={this.defaultHandler}
                type="button" 
                className="btn btn-outline-dark btn-sm">
          Set as Default
        </button>
        </div>
        <br />
        <br />
        <div  className="margin">
          <div className="bold2">&nbsp;&nbsp;
            To Do:
          </div>
          <br />
          { this.listItems() }
          <div className="bold2">&nbsp;&nbsp;
            Defaults:
          </div>
          <br/>
            {/* {this.state.axiosdefaults ? this.state.axiosdefaults.map((thing)=><li>{thing}</li>) : <div>"Loading"</div>} */}
        </div>
      </div>
    );
  }
} 