import React from "react";
import { Nav } from "react-bootstrap";
const ThemeContext = React.createContext({});

// import Gas from "./gas";
// import {ImageLink} from './imageLink';
class BlockChain extends React.Component {
  constructor() {
    super();
    this.state = {
      blockHash: "",
      blockNumber: "",
      contractAddress: "",
      gasUsed: "",
      trxUsed: "",
      ref: "",
      assetid: ""
    };

    // console.log(this.props);
    // let assetid = this.props.value;
    // console.log("assetinbc", assetid);
    // setTimeout(
    //     function() {
    //         this.componentDidMount = this.componentDidMount.bind(this);
    //     },
    //     60000
    // );
    // this.componentWillMount = this.componentWillMount.bind(this);
    // this.componentDidMount = this.componentDidMount.bind(this);

    // let assetid = window.location.pathname.split('/')[2];
    // console.log('asseytid' + assetid);
    // this.setState({assetid: this.props.assetid})
  }
  static contextType = ThemeContext.Provider;
  static contextConsumer = ThemeContext.Consumer;
  // asset = () => {
  //   this.setState({
  //     assetid: this.props.value
  //   });
  // };
  // BlockChain = data => {
  //   this.setState({
  //     assetid: this.props.value
  //   });
  // };
  // async componentWillMount() {
  //   const form1 = await await fetch("http://localhost:4000/asset");
  //   this.setState({
  //     asset_id: form1
  //   });
  // }
  // async componentDidMount(){
  //     const form = await (await fetch("http://localhost:4000/addBlockchain/:assetid")).json()
  //     this.setState({blockHash: form['blockHash']})
  //     this.setState({blockNumber:form['blockNumber']})
  //     this.setState({contractAddress:form['contract']})
  //     this.setState({gasUsed: form['gasUsed']})
  //     this.setState({trxUsed: form['transactionHash']})
  //     .then(response => response.json())
  //     this.props.onRouteChange('signin');
  // }

  // onSaveBC = (e) => {
  //     e.preventDefault()
  // asset = data => {
  //   this.setState({
  //     user: {
  //       assetid: data.assetid
  //     }
  //   });
  // };
  // assets = () => {
  //   this.setState(console.log({
  //     assetid: this.props.value
  //   })

  //   );
  // };
  componentWillMount() {
    fetch("http://localhost:4000/gas", {
      method: "get",
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(user => {
        if (user["assetid"]) {
          this.setState(
            (prevState, prevProps) => {
              return { assetid: user["assetid"] };
            },
            () => this.state.assetid
          );
          // this.props.loadUser(user);
        }
      });
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   //  this.setState({assetid: nextProps.value})
  //   // console.log(nextProps, "nextProps");
  //   return this.state.assetid === nextProps.value
  // }

  componentDidMount() {
    setTimeout(() => {
      console.log("time");
      let assetid = this.state.assetid;
      console.log(assetid, "saw");

      // this.setState({assetid: form.assetid})
      // let assetid = window.location.href
      // console.log(window.location.pathname,'pathname')
      // let asset_id = "28635017-b102-42eb-a3ea-90354e491879";
      // let assetid = window.location.pathname.split("/")[3];
      // let assetid = [ImageLink['asset_id']]
      // console.log(window.location.pathname.split("/")[2]);
      // console.log("asset in FEblock", this.props.assetid);

      fetch("http://localhost:4000/addBlockchain/" + assetid)
        .then(response => response.json())
        .then(user => {
          if (user["blockhash"]) {
            this.setState({ blockHash: user["blockhash"] });
            this.setState({ blockNumber: user["blocknumber"] });
            this.setState({ contractAddress: user["contract"] });
            this.setState({ gasUsed: user["gasused"] });
            this.setState({ trxUsed: user["trxused"] });
            this.setState({
              ref: `https://ropsten.etherscan.io/tx/${this.state.trxUsed}`
            });
          }
        });
    }, 1000);

    // this.setState({ blockHash: form["blockhash"] });
    // this.setState({ blockNumber: form["blocknumber"] });
    // this.setState({ contractAddress: form["contract"] });
    // this.setState({ gasUsed: form["gasused"] });
    // this.setState({ trxUsed: form["trxused"] });
    // this.setState({
    //   ref: `https://ropsten.etherscan.io/tx/${this.state.trxUsed}`
    // }).then(response => response.json());
    // console.log('asseytid' + assetid);
    // var ref = `https://ropsten.etherscan.io/tx/${this.state.trxUsed}`
    // document.getElementById('etherscan').innerHTML = ref;
    // document.getElementById('etherscan').setAttribute('href', ref);
    // this.props.onRouteChange("home");
  }

  // }
  render() {
    // console.log('props', this.props);
    // let { assetid } = this.props;
    const { onRouteChange } = this.props;
    return (
      <body>
        <section>
          <div className="flex">
            <div className="form center pa4 br3 shadow-5">
              <fieldset id="land_details" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0 center">Land Details</legend>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="block-hash">
                    Block Hash
                  </label>
                  <input
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="text"
                    value={this.state.blockHash}
                    name="block-hash"
                    onChange={this.componentDidMount}
                  />
                </div>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="block-number">
                    Block Number{" "}
                  </label>
                  <input
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="number"
                    value={this.state.blockNumber}
                    name="block-number"
                    onChange={this.componentDidMount}
                  />
                </div>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="address">
                    Contract Address
                  </label>
                  <input
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="text"
                    value={this.state.contractAddress}
                    name="address"
                    id="address"
                    onChange={this.componentDidMount}
                  />
                </div>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="number">
                    Gas Used
                  </label>
                  <input
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="number"
                    value={this.state.gasUsed}
                    name="price"
                    id="price"
                    onChange={this.componentDidMount}
                  />
                </div>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="number">
                    Transaction USed
                  </label>
                  <input
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    type="text"
                    value={this.state.trxUsed}
                    name="price"
                    id="price"
                    onChange={this.componentDidMount}
                  />
                </div>
                <div className="mt3">
                  <label className="db fw6 lh-copy f6" htmlFor="number">
                    Ether Scan{" "}
                  </label>
                  <Nav.Link
                    className="logo"
                    href={`https://ropsten.etherscan.io/tx/${
                      this.state.trxUsed
                    }`}
                  >
                    Transaction
                  </Nav.Link>
                  {/* <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    value={`https://ropsten.etherscan.io/tx/${this.state.trxUsed}`} /> */}
                </div>
                {/* <input className='f4 pa2 w-70 center'  id="file" type='file' name='file' onChange={(e) => this.onImageChange(e)} /> */}
                {/* <img src={`https://gateway.ipfs.io/ipfs/${this.state.data}`} alt=""/> */}
                <button
                  className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
                  onClick={() => onRouteChange("sell")}
                >
                  Go to Home
                </button>
              </fieldset>
            </div>
          </div>
        </section>
      </body>
    );
  }
}
export default BlockChain;

/*
import React from "react";
class BlockChain extends React.Component {
  constructor() {
    super();
    this.state = {
      blockHash: "",
      blockNumber: "",
      contractAddress: "",
      gasUsed: "",
      trxUsed: "",
      assetid: ""
    };
    this.componentDidMount = this.componentDidMount.bind(this);

async componentDidMount() {
    // this.setState({assetid: form.assetid})
    // let assetid = window.location.href
    // console.log(window.location.pathname,'pathname')
    // let asset_id = "28635017-b102-42eb-a3ea-90354e491879";
    // let assetid = window.location.pathname.split("/")[3];
    // let assetid = [ImageLink['asset_id']]
    // console.log(window.location.pathname.split("/")[2]);
    // console.log("asset in FEblock", this.props.assetid);

    const form = await (await fetch(
      "http://localhost:4000/addBlockchain/" + this.props.value
    )).json();
    this.setState({ blockHash: form["blockhash"] });
    this.setState({ blockNumber: form["blocknumber"] });
    this.setState({ contractAddress: form["contract"] });
    this.setState({ gasUsed: form["gasused"] });
    this.setState({ trxUsed: form["trxused"] });
    this.setState({
      ref: `https://ropsten.etherscan.io/tx/${this.state.trxUsed}`
    }).then(response => response.json());
    this.props.onRouteChange("signin");
  }
render() {
  return(

  )
  }
}

*/
