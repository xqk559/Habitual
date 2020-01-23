import React from 'react';
import Item from './Item.js';


let item2 = <Item message="Programmed" />;
let item3 = <Item message="Went for a Walk" />;
let item4 = <Item message="Ate Vitamins" />;

let allTheThings = [item2, item3, item4, 3,4];

class ItemList extends React.Component {
  constructor (props){
    super ();
    this.state = {
        completed : 100
        }
  }

  render (){
    let items = allTheThings.map(thing => thing);
    return (
        <div>
        <h4>{items}</h4>
        <div>You've completed {this.state.completed} things!</div>
        </div>
    );
  }
}

export default ItemList ;