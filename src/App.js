import React from 'react';
import './App.css';
import ItemCount from './Components/ItemCount';
import AppFooter from './AppFooter.js';
import Store from './Containers/Store';
import Toolbar from './Components/Toolbar';
import {Route, BrowserRouter} from 'react-router-dom';
import Stats from './Containers/Stats/Stats';

let allTheThings = [];

class App extends React.Component {
  constructor (props){
    super ();
  }

  render (){
    // const firebaseConfig = {
    //   apiKey: "AIzaSyBaJnlnubPwKJ9WkUJI6szWkCF_b0OomDk",
    //   authDomain: "habitual-f64a5.firebaseapp.com",
    //   databaseURL: "https://habitual-f64a5.firebaseio.com",
    //   projectId: "habitual-f64a5",
    //   storageBucket: "habitual-f64a5.appspot.com",
    //   messagingSenderId: "724890967012",
    //   appId: "1:724890967012:web:db8bcdd688daf44a78c5f1"
    // };

    // login = firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // // Handle Errors here.
    // var errorCode = error.code;
    // var errorMessage = error.message;
    // // ...
    // });

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
                
      </BrowserRouter>
    );
  }
}

export default App;
