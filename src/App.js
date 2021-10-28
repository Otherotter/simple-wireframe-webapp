import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';


import Navbar from './components/navbar/Navbar.js';
import LoginScreen from './components/login_screen/LoginScreen.js';
import RegisterScreen from './components/register_screen/RegisterScreen.js';
import HomeScreen from './components/home_screen/HomeScreen.js';
import DatabaseTester from './test/DatabaseTester'
import EditScreen from './components/edit_screen/EditScreen.js';
// import ItemScreen from './components/item_screen/ItemScreen.js';


class App extends Component{

  render() {
    /* const { auth } = this.props; */
    return (
      <BrowserRouter>
      {/* {console.log(firebaseConnect())}
      {console.log(connect(mapStateToProps))} */}
        <div className="App" >
          <Navbar />
          <Switch>
            <Route exact path="/Home" component={HomeScreen}/> 
            <Route path="/Login" component={LoginScreen} /> 
            <Route path="/Edit/" component={EditScreen} />
            <Route path="/Register" component={RegisterScreen} /> 
            <Route path="/DatabaseTester" component={DatabaseTester} />
            <Route any path="/" component={HomeScreen} />
            {/*  />
            <Route path="/Edit/name+id?WireframeName+WireframeId" component={ListScreen} />
            */}
          </Switch>
          {/* <Link to="/DatabaseTester">  <button> DateBaseTester</button> </Link> */}
        </div>
  
      </BrowserRouter>
    );
  
    
  }
}

const mapStateToProps = state => ({
  auth: state.firebase.auth,
});

export default compose(
  firebaseConnect(),
  connect(mapStateToProps),
)(App);

// export default App; 

