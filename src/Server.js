import React, { Component } from "react";
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
import Buy from "./components/Buy/Buy";
import Sell from "./components/Buy/Sell";
// import Metapay from "./components/Buy/metamask";
import WithDraw from "./components/Buy/metamask";
// import Load from "./components/Buy/Loader";
import Loader from "react-loader-spinner";
// import { Blockchain } from "./components/imageLink/saveasset";
// import { Blockchain } from "./components/imageLink/saveasset";
// const ThemeContext = React.createContext("light");
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
  isSave: false,
  isSell: false,
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
// const Sell = ({ route }) => {
//   return (
//     <Router>
//       <button
//         onClick={() => (
//           <Route
//             path="/"
//             render={() =>
//               route === "save" ? (
//                 <Redirect to="/gas" component={ImageLink} />
//               ) : (
//                 route === "home"
//               )
//             }
//           />
//         )}
//       >
//         Sell
//       </button>
//     </Router>
//   );
// };
class Server extends Component {
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
  // asset = data => {
  //   this.setState({
  //     result: {
  //       assetid: data.assetid
  //     }
  //   });
  // };
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

              <ImageLink
                assetid={this.props.asset_id}
                onRouteChange={this.onRouteChange}
              />
            </div>
          ) : route === "signin" ? (
            <Signin
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
            />
          ) : null}
          {route === "register" ? <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />:null}
          {route === "gas" ? <Gas onRouteChange={this.onRouteChange} /> : null}
          {route === "blockchain" ? (
            <Blockchain
              isLoading={isLoading}
              onRouteChange={this.onRouteChange}
            />
          ) : null}
          {route === "sell" ? <Sell onRouteChange={this.onRouteChange} /> : null}
          {route === "metapay" ? <WithDraw onRouteChange={this.onRouteChange} /> : null}

          {route === "save" ? <Buy onRouteChange={this.onRouteChange} /> : null}
        </div>
      </Router>
    );
  }
}
export default Server;
