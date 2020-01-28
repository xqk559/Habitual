import React, {Component} from 'react';
import Item from './Item.js';


let item2 = <Item message="Programmed" checked={0}/>;
let item3 = <Item message="Went for a Walk" checked={0}/>;
let item4 = <Item message="Ate Vitamins" checked={0}/>;

let allTheThings = [item2, item3, item4];

const updateChecked = () => {
  this.setState({numChecked:
    document.querySelectorAll('.checkbox-is-open-true').length
  });
}

const checkedd = document.querySelectorAll('.checkbox-is-open-true').length;



class ItemList extends React.Component {
  constructor (props){
    super ();
    this.state = {
        completed : 100,
        isChecked: false,
        numChecked: 0,
        checker: {
          item2: 0,
          item3: 0
        }
        
        }
        
  }


  render (){


    let items = allTheThings.map(thing => thing);
    return (
        <div>
        <h4>{items}</h4>
        <p>{item4.props.checked}</p>
        <div>You've completed {this.state.completed} things!</div>
        <p>{checkedd}</p>
        <Item message="Tried Something New" updateChecked={() => updateChecked}/>
        <p>{this.state.numChecked}</p>
        </div>
    );
  }
}

export default ItemList ;