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
        this.setState({totalChecked: this.state.totalChecked-1}) :
        this.setState({totalChecked: this.state.totalChecked+1});
  };

  onInputChange(e) {
    this.setState({
      inputValue: e.target.value,
    });
  }

  addItem() {
    let items = this.state.items;
    items.push(<Item message={this.state.inputValue} adder={this.addTotal}/>);
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
        <button onClick={ () => this.addItem() }>Add item</button>
        { this.listItems() }
      </div>
    );
  }
} 