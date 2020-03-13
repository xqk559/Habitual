import React from 'react';
import './App.css';
import ItemCount from './Components/ItemCount';
import AppFooter from './AppFooter.js';
import Store from './Containers/Store';
import Toolbar from './Components/Toolbar';
import {Route, BrowserRouter} from 'react-router-dom';
import Stats from './Containers/Stats/Stats';

let allTheThings = [];

const App = () => {
    return (
      <BrowserRouter>
        <Route path="/(|checklist)/" exact render={()=> 
          <div className="phone">
          <Toolbar />
          {/* <Calendar /> */}
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
        <Route path="/login/" 
               exact 
               render={()=><Toolbar/>}/>
        <Route path="/statistics/" 
               exact 
               render=
                {()=>
                  <div>
                    <Toolbar/>
                    <Stats/>
                  </div> 
                }/>
        <Route path="/redux/" 
               exact 
               render={()=><Toolbar/>}/>     
      </BrowserRouter>
    );
}

export default App;
