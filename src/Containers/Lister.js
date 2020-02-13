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
      defaults: [],
      axiosdefaults: [],
    }
  }

  UNSAFE_componentWillMount() {
    let d;
    let keys;
    let leng;
    let last;
    let lastDefault;
    let array;
    axios.get('https://habitual-f64a5.firebaseio.com/defaults.json')
        .then((response)=> d = response.data)
          .then(()=> keys = Object.keys(d))
            .then(()=> leng = keys.length)
              .then(()=> last = keys[leng-1])
                .then(()=>axios.get('https://habitual-f64a5.firebaseio.com/defaults/'+(last)+'.json'))
                  .then((response)=>lastDefault = response.data)
                    .then(()=>array = Array.from(lastDefault))
                      .then(()=>this.setState({defaults: array},()=>console.log()));
  }

  booler = (bool) => {
    this.props.booleroo(bool);
  }

  reverseBooler = (bool) => {
    this.props.booleroo(!bool);
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
    const capitalizer = (s) => 
      {
        return s.charAt(0).toUpperCase() + s.slice(1)
      }
    const capitalized = capitalizer(e.target.value)
    this.setState
      ({
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

  placeholder() {
    
  }

  listDefaults() {
    let items = this.state.defaults;
    return (
      <ul>
        {
          items.map((val, index) => {
            return (
              <li key={index}
                  className="none">
                { <Item message={val.props.message} 
                        adder={this.addTotal}
                        booler={this.reverseBooler}
                        messager={this.messager}/> }
              </li>
            );
          })
        }
      </ul>
    );
  }

  defaultHandler = () => {
    let defaults = this.state.items;
    let d;
    let keys;
    let leng;
    let last;
    axios.get('https://habitual-f64a5.firebaseio.com/defaults.json')
        .then((response)=> d = response.data)
          .then(()=> keys = Object.keys(d))
            .then(()=> leng = keys.length)
              .then(()=> last = keys[leng-1])
                .then(()=>axios.delete('https://habitual-f64a5.firebaseio.com/defaults/'+(last)+'.json'))
                  .then(()=>axios.post('https://habitual-f64a5.firebaseio.com/defaults.json', defaults));
  }


  render() {
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
          {this.listDefaults()}
        </div>
      </div>
    );
  }
} 