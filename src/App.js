import React from 'react';
import './App.css';
import ItemCount from './Components/ItemCount';
import AppFooter from './AppFooter.js';
import Store from './Containers/Store';
import Toolbar from './Components/Toolbar';
import {Route, BrowserRouter} from 'react-router-dom';

let allTheThings = [];

class App extends React.Component {
  constructor (props){
    super ();
  }
  render (){
    return (
      <BrowserRouter>
        <Route path="/(|checklist)/" exact render={()=> 
          <div className="phone">
          <Toolbar />
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
          <div >
            <Store/>
          </div>
          <br />
          <div className="centered">
            <ItemCount count={allTheThings.length} />
            <hr />
            <AppFooter />
          </div>
        </div>
        }/>
        <Route path="/(statistics|login)/" exact render={()=><Toolbar/>}/>
      </BrowserRouter>
    );
  }
}

export default App;
