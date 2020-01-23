import React, { Component } from 'react';
import './App.css';
import Item from './Item.js';
import ItemList from './ItemList.js';
import ItemCount from './ItemCount.js';


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
          You've done  many things today!
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


class AppJumbotron extends React.Component {
  render (){
    return (
      <div className="jumbotron">
        <h2>{this.props.title}</h2>
      </div>
    );
  }
}

class AppFooter extends React.Component {
  render (){
    return (
      <div className="text-muted">
        <small>&copy; {new Date().getFullYear()}</small>
      </div>
    );
  }
}

let target = document.getElementById('app');



export default App;
