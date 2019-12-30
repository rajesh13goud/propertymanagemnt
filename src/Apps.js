import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Buy from "./components/Buy/Buy";
import WithDraw from "./components/Buy/metamask";
import "./App.css";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
// import Rank from "./components/Rank/Rank";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import ImageLink from "./components/imageLink/imageLink";
import Gas from "./components/imageLink/gas";
// import { Blockchain } from "./components/imageLink/saveasset";
import Blockchain from "./components/imageLink/blockchain";
import { BrowserRouter as Router } from "react-router-dom";
import Sell from "./components/Buy/Sell";
// import Metapay from "./components/Buy/metamask";
// import Load from "./components/Buy/Loader";
import Loader from "react-loader-spinner";

const initialState = {
  input: "",
  route: "signin",
  image: "",
  searchfield: "",
  gas: "",
  imageIn: null,
  isSignedIn: false,
  isGas: false,
  isBC: false,
  isLoading: false,
  isSell: false,
  isSave: false,
  user: {
    id: "",
    name: "",
    email: "",
    password: "",
    mobile: "",
    entries: 0,
    assetid: "",
    imageIn: "",
    gasPrice: "",
    eth: "",
    joined: new Date()
  },
  result: {
    assetid: ""
  }
};
class Apps extends Component {
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
  asset = data => {
    this.setState({
      result: {
        assetid: data.assetid
      }
    });
  };
  onRouteChange = route => {
    if (route === "signout") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    } else if (route === "gas") {
      this.setState({ isGas: true });
    } else if (route === "blockchain") {
      this.setState({ isBC: true });
    } else if (route === "save") {
      this.setState({ isSell: true });
    } else if (route === "metapay") {
      this.setState({ isSave: true });
    }
    this.setState({ route: route });
  };
  //   render() {
  //     const { isSignedIn, route, isBC, isLoading } = this.state;
  //     return (
  //       <Router>
  //         <div className="container">
  //           <nav className="navbar navbar-expand-lg navbar-light bg-light">
  //             <a
  //               className="navbar-brand"
  //               href="https://heptagon.in"
  //               target="blank"
  //             >
  //               <img src={logo} width="30" height="30" alt="PropertyManagement" />
  //             </a>
  //             <Link to="/" className="Navbar-brand">
  //               Property Buy/Sell
  //             </Link>
  //             <div className="collpase navbar-collapse">
  //               <ul className="navbar-nav mr-auto">
  //                 <li className="navbar-item">
  //                   <Link to="/" className="nav-link">
  //                     signin
  //                   </Link>
  //                 </li>
  //                 <li className="navbar-item">
  //                   <Link to="/buy" className="nav-link">
  //                     Buy
  //                   </Link>
  //                 </li>
  //                 <li className="navbar-item">
  //                   <Link to="/add" className="nav-link">
  //                     Sell
  //                   </Link>
  //                 </li>
  //               </ul>
  //             </div>
  //           </nav>
  //           <br />
  //           <Route path="/home" exact component={Navigation} render={props => <Signin {...props} /> } />
  //           {/* <Redirect from="/" to="/signin" /> */}
  //           <Route path="/signin" component={Signin} loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
  //           <Route path="/ass" component={ImageLink} />
  //           <Route path="/buy" component={Gas} />
  //           <Route path="/save" component={Blockchain} />
  //         </div>
  //       </Router>
  //     );
  //   }
  render() {
    const { isSignedIn, route, isLoading } = this.state;
    if (isLoading) {
      return <Loader type="Audio" color="#somecolor" height={80} width={80} />;
    }
    return (
      <Router>
        <div className="App">
          <Navigation
            isSignedIn={isSignedIn}
            onRouteChange={this.onRouteChange}
          />
          {route === "home" ? (
            <div>
              <Logo />
              <Buy onRouteChange={this.onRouteChange} />
            </div>
          ) : route === "signin" ? (
            <Signin
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
            />
          ) : (
            null
          )}
          {route === "metapay" ? (
            <WithDraw onRouteChange={this.onRouteChange} />
          ) : null}
        </div>
      </Router>
    );
  }
}
export default Apps;
