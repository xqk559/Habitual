import React, { Component } from 'react';
import Item from './Item';
import '../App.css';
  
export default class Lister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalChecked: 0,
      inputValue: '',
      items: []
    }
  }

  booler = (bool) => {
    this.props.booleroo(bool);
  }

  addTotal = (childChecked) =>  {
    //console.log(childChecked);
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

  addItem() {
    let items = this.state.items;
    items.push(<Item message={this.state.inputValue} 
                     adder={this.addTotal}
                     booler={this.booler}/>);
    this.setState({items},()=>this.props.namer(this.state.inputValue));
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



  render() {
    return (
      <div>
        <div className="centered2">
        <input type="text" onChange={ (e) => this.onInputChange(e) } />
        &nbsp;&nbsp;&nbsp;
        <button onClick={ () => this.addItem() }
                type="button" 
                class="btn btn-outline-dark btn-sm">
          Add Item
        </button>
        &nbsp;
        <button onClick={ () => this.removeItem() }
                type="button" 
                class="btn btn-outline-danger btn-sm">
          Remove Last Item
        </button>
        </div>
        <br />
        <br />
        <div  className="margin">
        <div className="bold2">&nbsp;&nbsp;To Do:</div>
        <br />
        { this.listItems() }
        </div>
      </div>
    );
  }
} 