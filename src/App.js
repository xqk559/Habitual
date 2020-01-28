import React from 'react';
import './App.css';
import Item from './Item.js';
import ItemList from './ItemList.js';
import ItemCount from './ItemCount.js';
import AppFooter from './AppFooter.js';
import Store from './Store';


let item2 = <Item message="Programmed" />;
let item3 = <Item message="Went for a Walk" />;
let item4 = <Item message="Ate Vitamins" />;

let allTheThings = [item2, item3, item4];


class App extends React.Component {
  constructor (props){
    super ();
  }
  render (){

    return (
      <div>
        <br />
        <br />
        <div className="rainbow-text">
          Habitual
        </div>
        <div className="rainbow-text-small">
          You've done so many things today!
        </div>
        <div className="bigmargin">
          <Store />
          </div>
        <div className="bigmargin">
        <ItemList />
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        </div>
        <ItemCount count={allTheThings.length} />
        <hr />
        <AppFooter />
      </div>
    );
  }
}

export default App;
