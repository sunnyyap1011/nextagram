import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom"

import HomePage from './pages/HomePage';
import UserProfilePage from './pages/UserProfilePage';
import NavigationBar from './components/NavigationBar';
import MyProfilePage from './pages/MyProfilePage';
import { ToastContainer } from 'react-toastify';

import './App.css';



class App extends React.Component {

  state = {
    currentUser: {
      username: localStorage.getItem("username"),
      jwt: localStorage.getItem("JWT"),
      profilePicture: localStorage.getItem("profilePicture"),
      userId: localStorage.getItem("userId")
    }
  }

  updateUser = (data) => {
    this.setState({
      currentUser: data
    })
  }

  render() {
    console.log(this.state.currentUser)
    return (
      <div>
        <NavigationBar currentUser={this.state.currentUser} updateUser={this.updateUser} />
        <Switch>

        {/* <Route
            exact
            path="/"
            component={
              props => <HomePage {...props} currentUser={this.state.currentUser} />
              }
          /> */}

          <Route
            exact
            path="/"
            render={
              props => <HomePage {...props} currentUser={this.state.currentUser} />
              }
          />

          <Route
            exact
            path="/users/:id"
            component={
              props => <UserProfilePage {...props} currentUser={this.state.currentUser} />
            } />
            

          <Route
            exact
            path="/profile"
            render={
              props => <MyProfilePage {...props} currentUser={this.state.currentUser} />
              }
          />

        </Switch>
        <ToastContainer />
      </div>
    );
  }
}


export default App;
