import React, { Component } from "react";
import { Nav } from "react-bootstrap";
import Web3 from "web3";
var web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://ropsten.infura.io/v3/3f515a48f1d84d5bb73607d54389b693"
  )
);

class Sell extends Component {
  constructor() {
    super();
    this.state = {
      ipfshash: "",
      address: "",
      setprice: "",
      contractaddress: ""
    };
  }
  componentWillMount() {
    fetch("http://localhost:4000/sell", {
      method: "get",
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(result => {
        if (result["ipfshash"]) {
          this.setState({
            ipfshash: result["ipfshash"],
            address: result["address"],
            setprice: result["price"],
            contractaddress: result["contractaddress"]
          });
        }
      });
  }
  sellProperty = () => {
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
      try {
        window.ethereum.enable();

        // User has allowed account access to DApp...
        // var contractAddress = "0xE95194ddDD05B09f0e500D59Cba88e7F68cb1d1e";
        var contractAddress = "0x27E4d9B683FeeB6296C7De45e53bE3A74D811232";
        var contractABI = [
          {
            constant: true,
            inputs: [],
            name: "seller",
            outputs: [
              {
                name: "",
                type: "address"
              }
            ],
            payable: false,
            stateMutability: "view",
            type: "function"
          },
          {
            constant: true,
            inputs: [
              {
                name: "",
                type: "address"
              }
            ],
            name: "balances",
            outputs: [
              {
                name: "",
                type: "uint256"
              }
            ],
            payable: false,
            stateMutability: "view",
            type: "function"
          },
          {
            constant: true,
            inputs: [
              {
                name: "",
                type: "uint256"
              }
            ],
            name: "plots",
            outputs: [
              {
                name: "owner",
                type: "address"
              },
              {
                name: "seller",
                type: "address"
              },
              {
                name: "forSale",
                type: "bool"
              },
              {
                name: "price",
                type: "uint256"
              }
            ],
            payable: false,
            stateMutability: "view",
            type: "function"
          },
          {
            inputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "constructor"
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: false,
                name: "index",
                type: "uint256"
              }
            ],
            name: "PlotOwnerChanged",
            type: "event"
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: false,
                name: "index",
                type: "uint256"
              },
              {
                indexed: false,
                name: "price",
                type: "uint256"
              }
            ],
            name: "PlotPriceChanged",
            type: "event"
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: false,
                name: "index",
                type: "uint256"
              },
              {
                indexed: false,
                name: "price",
                type: "uint256"
              },
              {
                indexed: false,
                name: "forSale",
                type: "bool"
              }
            ],
            name: "PlotAvailabilityChanged",
            type: "event"
          },
          {
            constant: false,
            inputs: [
              {
                name: "index",
                type: "uint256"
              },
              {
                name: "price",
                type: "uint256"
              }
            ],
            name: "plotForSale",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            constant: false,
            inputs: [],
            name: "sell",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            constant: false,
            inputs: [
              {
                name: "index",
                type: "uint256"
              }
            ],
            name: "takeOffMarket",
            outputs: [],
            payable: false,
            stateMutability: "nonpayable",
            type: "function"
          },
          {
            constant: true,
            inputs: [],
            name: "getPlots",
            outputs: [
              {
                name: "",
                type: "address[]"
              },
              {
                name: "",
                type: "bool[]"
              },
              {
                name: "",
                type: "uint256[]"
              }
            ],
            payable: false,
            stateMutability: "view",
            type: "function"
          },
          {
            constant: false,
            inputs: [
              {
                name: "index",
                type: "uint256"
              }
            ],
            name: "buyPlots",
            outputs: [],
            payable: true,
            stateMutability: "payable",
            type: "function"
          },
          {
            constant: false,
            inputs: [],
            name: "withDraw",
            outputs: [],
            payable: true,
            stateMutability: "payable",
            type: "function"
          }
        ];
        // var account = web3.eth.accounts.privateKeyToAccount(
        //   "0x" +
        //     "1E6F35D84D9522005884EF0C6FDBDC9040E83621BDDE94D14FE22116354639CE"
        // );
        // //   var myAddr = "0xe13d1118c2eBC2D952760EDfd5625BdDe79250a2";
        // web3.eth.accounts.wallet.add(account);
        // web3.eth.defaultAccount = account.address;
        //   console.log("coinbase account", web3.eth.defaultAccount);
        //   console.log("2", web3.eth.accounts.wallet[0]);
        //   console.log(
        // "3",
        // web3.utils.checkAddressChecksum(web3.eth.defaultAccount)
        //   );
        //   console.log("4", web3.eth.Iban.isValid(web3.eth.defaultAccount));
        //   console.log("5", web3.utils.isAddress(web3.eth.defaultAccount));
        //   var contractInstance = new web3.eth.Contract(
        //     contractABI,
        //     contractAddress
        //   );
        //   web3.eth.getBalance(contractAddress, (err, wei) => {
        //     let balance = web3.utils.fromWei(wei, "ether");
        //     console.log(balance, "bal");
        //   });
        //   contractInstance.methods.getPlots().call((err, res) => {
        //     console.log("items available", res);
        //   });
        var contractIns = new web3.eth.Contract(contractABI, contractAddress);
        //   web3.eth.getTransactionCount(myAddr).then(function(res) {
        //     console.log(res, "gasPriceCount");
        //   });
        web3.eth.getAccounts().then(function(result) {
          console.log(result[0], "address");
          let from = result[0];
          let tx_b = contractIns.methods.sell();
          // console.log(tx_b, "buyplot info");
          let enc_b = tx_b.encodeABI();
          // let price =  this.state.price
          // console.log(price,'price')
          let trx = {
            to: contractAddress,
            gas: 4700000,
            data: enc_b,
            from: from
          };
          // console.log(trx, "trx:");

          window.ethereum.enable().then(
            web3.eth.sendTransaction(trx).then(function(result) {
              console.log("result receipt", result);
            })
          );
        });
      } catch (e) {
        // User has denied account access to DApp...
      }
    }
    // Legacy DApp Browsers
    else if (window.web3) {
      console.log("Inside if else");
      window.web3 = new Web3(web3.currentProvider);
    }
    // Non-DApp Browsers
    else {
      alert("You have to install MetaMask !");
    }
  };
  home = () => {
    this.props.onRouteChange("home");
  };
  rent = () => {
    return <h1>Coming soon...</h1>;
  };
  render() {
    const { onRouteChange } = this.props;
    return (
      <div className="mt3">
        <div className="form-group pa4 br3 center transparent">
          <label className="db fw6 lh-copy f6">Details</label>
          <Nav.Link
            className="logo"
            href={`https://gateway.ipfs.io/ipfs/${this.state.ipfshash}`}
            target="blank"
          >
            Property{<image alt="../Logo/house.png" />}
          </Nav.Link>
        </div>
        <div className="mt3">
          <label className="db fw6 lh-copy f6" htmlFor="name">
            Land Address
          </label>
          <input
            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
            id="asset-name"
            value={this.state.address}
            onChange={this.componentWillMount}
          />
          <br />
          <label className="db fw6 lh-copy f6" htmlFor="price">
            Price
          </label>
          <input
            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
            id="asset-price"
            value={this.state.setprice}
            onChange={this.componentWillMount}
          />
          (eths)
          <br />
        </div>
        <div className="asset-details">
          <br />
          <label className="db fw6 lh-copy f6" htmlFor="contract-address">
            Contract Address
          </label>
          <input
            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
            id="cotractaddress"
            value={this.state.contractaddress}
            onChange={this.componentWillMount}
          />
        </div>
        <button
          onClick={() => {
            this.sellProperty();
          }}
        >
          Sell
        </button>
        <button
          onClick={() => {
            this.rent();
          }}
        >
          Rent
        </button>
        <button
          onClick={() => onRouteChange("signout")}
        >
          Home
        </button>
      </div>
    );
  }
}
export default Sell;
