import React from 'react';
import './App.scss';
import Toolbar from './Components/Toolbar';
import {Route, BrowserRouter, Switch, Redirect} from 'react-router-dom';
import Habitual from './Components/habitual';
import Auth from './Components/auth';
import Statistics from './Components/stats';
import Calendar from './calendar';
import {connect} from 'react-redux';
import * as actionCreators from './Store/actions/index';
import Homepage from './Components/homepage';
import BarChart from './Components/barchart';
// import {HabitualContext} from './context';

const App = props => {

  // const habitualContext = useContext(HabitualContext);
  // console.log(habitualContext)

  return (
    <div>
      <BrowserRouter forceRefresh={true}>
        <Switch>
          <Route
            path="/"
            exact
            render=
              {()=>
                <Homepage/>}/>
          <Route
            path="/checklist/"
            exact
            render=
              {()=>
                <div className="overflow">
                  <Toolbar/>
                  <div>
                    <Habitual/>
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
                  </div>}/>
          <Route path="/statistics/"
                 exact
                 render=
                  {()=>
                    <div className="overflow">
                      <Toolbar/>
                      <div>
                        <Statistics/>
                      </div>
                      <div className="calendar">
                        <Calendar/>
                      </div>
                      <div className="barChart">
                        <BarChart/>
                      </div>
                    </div>
                  }/>
          <Route
            path="/logout/"
            exact
            render=
            {()=> props.logoutRedux()}>
              <Redirect to="/" exact/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    logoutRedux: (token, userId)=> dispatch(actionCreators.logout(token, userId)),
  };
};

export default connect(mapDispatchToProps)(App);


