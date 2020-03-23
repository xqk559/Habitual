import React from 'react';
import './App.scss';
import AppFooter from './AppFooter.js';
import Toolbar from './Components/Toolbar';
import {Route, BrowserRouter, Switch} from 'react-router-dom';
import Habitual from './Components/habitual';
import Auth from './Components/auth';
import Statistics from './Components/stats';
import Calendar from './calendar';

const App = () => {
    return (
      <BrowserRouter forceRefresh={true}>
        <Switch>
          <Route
            path="/(|checklist)/"
            exact
            render=
              {()=>
                <div className="overflow">
                <Toolbar />
                <div >
                  <Habitual/>
                </div>
                <div className="centered">
                  <hr />
                  <AppFooter />
                </div>
                </div>
                }/>
          <Route
            path="/login/"
            exact
            render=
            {()=> <div>
                    <Toolbar/>
                    <Auth />
                    <div className="centered">
                      <AppFooter/>
                    </div>
                  </div>}/>
          <Route path="/statistics/"
                 exact
                 render=
                  {()=>
                    <div className="overflow">
                      <Toolbar/>
                      <Statistics/>
                      <div className="calendar">
                        <Calendar/>
                      </div>
                      <div className="centered">
                        <AppFooter/>
                      </div>
                    </div>
                  }/>
        </Switch>
      </BrowserRouter>
    );
}

export default App;


