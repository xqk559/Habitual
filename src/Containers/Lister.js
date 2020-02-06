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

  addTotal = (childChecked) => {
    childChecked ? 
        this.setState({totalChecked: this.state.totalChecked - 1}) :
        this.setState({totalChecked: this.state.totalChecked + 1});
        console.log(this.state.totalChecked);
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
    items.push(<Item message={this.state.inputValue} adder={this.addTotal}      />);
    this.setState({
      items
    });
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
        <input type="text" onChange={ (e) => this.onInputChange(e) } />
        <button onClick={ () => this.addItem() }
                className="buttonMargin">
          Add item
        </button>
        { this.listItems() }
      </div>
    );
  }
} 