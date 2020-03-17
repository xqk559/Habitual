import React from 'react';
import './App.css';
import ItemCount from './Components/ItemCount';
import AppFooter from './AppFooter.js';
import Store from './Containers/Store';
import Toolbar from './Components/Toolbar';
import {Route, BrowserRouter} from 'react-router-dom';
import Stats from './Containers/Stats/Stats';
import Habitual from './Components/habitual';

let allTheThings = [];

const App = () => {
    return (
      <BrowserRouter>
        <Route path="/(|checklist)/" exact render={()=> 
          <div className="phone">
          <Toolbar />
          <br />
          <br />
          <br />
          <div >
            <Habitual/>
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
      </BrowserRouter>
    );
}

export default App;


