import React, { Component } from "react";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import ReactDOM from 'react-dom';
import Navigation from "./components/Navigation/Navigation";
import Signin from "./components/Signin/Signin";
// import Register from './components/Register/Register';
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ErrorBoundry from "./components/Navigation/ErrorBoundry";
// import Gas from "./components/imageLink/gas";
import ImageLink from "./components/imageLink/imageLink";
// import BlockChain from "./components/imageLink/blockchain";
import "./App.css";
// import BlockChain from "./components/imageLink/blockchain";
import { Blockchain } from "./components/imageLink/saveasset";

const initialState = {
  input: "",
  route: "signin",
  image: "",
  searchfield: "",
  imageIn: null,
  isSignedIn: false,
  isGasprice: false,
  isBlock: false,
  user: {
    id: "",
    name: "",
    email: "",
    password: "",
    mobile: "",
    entries: 0,
    imageIn: "",
    joined: new Date()
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }
  loadUser = data => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        mobile: data.mobile,
        entries: data.entries,
        joined: data.joined
      }
    });
  };
  loadForm = data => {
    this.setState({
      user: {
        id: data.id,
        ownername: data.ownername,
        location: data.location,
        address: data.address,
        price: data.price,
        // propertyname: data.propertyname,
        // mobile: data.mobile,
        // price: data.price,
        // landetails: data.landetails,
        entered: data.joined
      }
    });
  };
  
  invoice = data => {
    this.setState({
      user: {
        assetid: data["data"]
        // blockNumber: data.blockNumber,
        // blockHash: data.blockHash,
        // contract: data.contract,
        // gasUsed: data.gasUsed,
        // trxUsed: data.trxUsed
      }
    });
  };
  onRouteChange = route => {
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    } else if (route === "gas") {
      this.setState({ isGasprice: true });
    } else if (route === "blockchain") {
      this.setState({ isBlock: true });
    }
    this.setState({ route: route });
  };
  onSearchChange = event => {
    this.setState({ searchfield: event.target.value });
  };
  render() {
    const { isSignedIn, route } = this.state;
    return (
      <div className="App">
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === "home" ? (
          <div>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ErrorBoundry>
              <ImageLink
                onButtonSubmit={this.onButtonSubmit}
                onRouteChange={this.onRouteChange}
                
              />

              {/* {route === 'blockchain' ?
                  <Gas />
                  :<Logo /> } */}
            </ErrorBoundry>

            {/* <Target /> */}
          </div>
        ) : route === "signin" ? (
          <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Blockchain  invoice={this.invoice} />
        )}
        {route === "blockchain" ? (
          <div>{/* <BlockChain /> */}</div>
        ) : (
          <Navigation />
        )}
      </div>
    );
  }
}
export default App;
