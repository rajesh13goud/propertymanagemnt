import React from "react";
// import ImageLink from "./imageLink";
// import BlockChain from "./blockchain";
import { BrowserRouter as Router } from "react-router-dom";
// import BlockChain from "./blockchain";
// import "./gas.css";
import Loader from "react-loader-spinner";

// import { BlockChain } from "./blockchain";

class Gas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gasprice: "",
      eth: "",
      asset_id: "",
      isLoading: false,
      match: ""
    };

    this.componentDidMount = this.componentDidMount.bind(this);
    this.Component = this.Component.bind(this);
  }

  //   componentWillUnmount(){
  // console.log("unmounted")
  //   }
  // componentWillUpdate(){
  //   this.setState({
  //     assetid: this.props.value
  //   })
  // }
  async componentDidMount(e) {
    // const gasPrice = await (await fetch("http://localhost:4000/gas")).json();
    // this.setState({ gasprice: gasPrice["message"] });
    // this.setState({ eth: gasPrice["txCost"] });
    // this.setState({ assetid: gasPrice["assetid"] }, () => {
    //   console.log(gasPrice["assetid"], "datagas");
    // });

    fetch("http://localhost:4000/gas", {
      method: "get",
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(result => {
        if (result["txCost"]) {
          this.setState({
            eth: result["txCost"],
            gasprice: result["message"],
            asset_id: result["assetid"]
          });
          // this.props.asset(result);
        }
      });
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log("propsfrom imagelink", nextProps.asset_id);
  //   console.log("nextstate", nextState);
  //   return nextProps.asset_id !== this.props.asset_id;
  // }
  async Component() {
    // let assetid = this.state.assetid;
    // let assetid = window.location.pathname.split("/")[2];
    // let assetid = this.props
    // console.log(this.props.match.params.assetid,'raar')
    // console.log("thussss", assetid);
    this.setState({ isLoading: true });
    await (await fetch(
      "http://localhost:4000/saved/" + this.state.asset_id
    )).json();
    this.setState({ isLoading: false });
    this.props.onRouteChange("blockchain");
  }
  // renderLoader = () => <div className="loader" />;

  render() {
    const { isLoading } = this.state;
    if (isLoading) {
      return <Loader type="Audio" color="#somecolor" height={80} width={80} />;
    }
    return (
      <Router>
        <body>
          <section>
            <div className="flex">
              <div className="form center pa4 br3 shadow-5">
                <h6 className="my_asset">Cost Info</h6>
                <form
                  className="auth_form"
                  id="saveAssetzForm"
                  name="saveAssetzForm"
                >
                  <p className="mt-3">
                    Please check and confirm the rate Details below,
                  </p>
                  {/* <contextType value={this.state.assetid}>
                  <BlockChain />
                </contextType> */}
                  <div className="form-group pa4 br3 center">
                    <label>Gas Price</label>
                    <input
                      className="form-control transparent"
                      type="text"
                      value={this.state.gasprice}
                      name="gasprice"
                      placeholder="0.02"
                      onChange={this.componentDidMount}
                    />
                  </div>
                  <div className="form-group pa4 br3 center">
                    <label>ETH</label>
                    <input
                      className="form-control"
                      type="text"
                      value={this.state.eth}
                      name="eth"
                      placeholder="0.000002"
                      onChange={this.componentDidMount}
                    />
                  </div>
                  <div className="form-group pa4 br3 center">
                    <label>Network</label>
                    <input
                      className="form-control"
                      type="text"
                      id="network"
                      name="network"
                      placeholder="Ethereum Testnet"
                    />
                    <div className="">
                      {/* <button onClick={this.onAssetSubmit}  className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" >
                         Add Asset </button> */}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </section>
          <div className="footer">
            <div className="App">
              <button onClick={() => this.Component()} isLoading={isLoading}>
                Save to BlockChain
              </button>
              {/* <button className="start_btn mb-1" onClick={this.Component}>
                Save To BlockChain
              </button> */}
            </div>
            <div>
              {/* <Route path={match.url + "/save"} component={BlockChain} /> */}
            </div>
          </div>
          <div
            className="modal show"
            id="myModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="mySmallModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-sm">
              <div className="modal-body">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
                <p className="mb-1">Saving permanently to ethreum blockchain</p>
                <small>Please do not exit the app</small>
              </div>
            </div>
          </div>
        </body>
      </Router>
    );
  }
}
export default Gas;

/*

import React from "react";
class Gas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assetid: ""
    };
    this.componentDidMount = this.componentDidMount.bind(this)
    this.Component = this.Component.bind(this);
  }
    async componentDidMount(e) {
      const gasPrice = await (await fetch("http://localhost:4000/gas")).json();
      this.setState({ assetid: gasPrice["assetid"] });

    }
async Component() {
    await (await fetch(
      "http://localhost:4000/saved/" + this.state.assetid
    )).json();
    this.props.onRouteChange("blockchain");
  }    
render() {
  const {assetid} = this.props;
  if(assetid){
    return <BlockChain value={this.props.assetid}
  }
 return (
<div className="home_container">
            <button className="start_btn mb-1" onClick={this.Component}>
              Save To BlockChain
            </button>
          </div>
  )
 }
}


    */
