import React, { Component } from "react";
import {Router, Route, Switch} from 'react-router-dom'
import Navigation  from '../../components/Navigation/Navigation'
import Sell from "../../components/imageLink/imageLink";
import Buy from "../../components/Buy/Buy"
import Logo from "../../components/Logo/Logo";
const initialState ={
    isSignedIn: false,
    isSignedout:false,
    route: "signin"
}
class Landing extends Component {
    constructor(){
        super()
        this.state=
            initialState
        }
        
    onRouteChange = route => {
        if (route === "signout") {
          this.setState(initialState);
        } else if (route === "home") {
          this.setState({ isSignedIn: true });
        } else if (route === "gas") {
          this.setState({ isGas: true });
        } else if (route === "blockchain") {
          this.setState({ isBC: true });
        } else if (route === "metapay") {
          this.setState({ isSave: true });
        } else if (route === "sell") {
          this.setState({ isSell: true });
        }
        this.setState({ route: route });
      };
    render(){
        const {isSignedIn, route} = this.state;
        return(
<Router>
        <div className="App">
          <Navigation
            isSignedIn={isSignedIn}
            onRouteChange={this.onRouteChange}
          />
          { route === "home" ?(
              <Switch>
              <Route path="/buy" component={Buy} />
              <Route path="/sell" componet={Sell} />
              <Route path="/" component={Logo} />
              </Switch>
          ):null}
          </div>
          </Router>
        )
    }
}
export default Landing;