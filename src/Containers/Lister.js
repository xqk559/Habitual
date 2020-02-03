import React, { Component } from 'react';
  
export default class Lister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      items: [],
    }
  }

  onInputChange(e) {
    this.setState({
      inputValue: e.target.value,
    });
  }

  addItem() {
    let items = this.state.items;
    items.push(this.state.inputValue);
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
              <li key={index}>
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