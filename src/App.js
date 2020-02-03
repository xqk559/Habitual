import React from 'react';
import './App.css';
import ItemCount from './Components/ItemCount';
import AppFooter from './AppFooter.js';
import Store from './Containers/Store';

let allTheThings = [];

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
        <br />
        <br />
        <div className="bigmargin">
          <Store className="centered"/>
        </div>
        <br />
        <ItemCount count={allTheThings.length} />
        <hr />
        <AppFooter />
      </div>
    );
  }
}

export default App;
