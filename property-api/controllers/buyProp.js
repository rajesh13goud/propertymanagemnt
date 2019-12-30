const Web3 = require("web3");
var web3 = new Web3(
  new Web3.providers.HttpProvider(
    "https://ropsten.infura.io/v3/3f515a48f1d84d5bb73607d54389b693"
  )
);

var contractAddress = "0x27E4d9B683FeeB6296C7De45e53bE3A74D811232";
var contractABI = [
  {
    "constant": true,
    "inputs": [],
    "name": "seller",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "balances",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "plots",
    "outputs": [
      {
        "name": "owner",
        "type": "address"
      },
      {
        "name": "seller",
        "type": "address"
      },
      {
        "name": "forSale",
        "type": "bool"
      },
      {
        "name": "price",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "PlotOwnerChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "index",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "price",
        "type": "uint256"
      }
    ],
    "name": "PlotPriceChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "index",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "price",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "forSale",
        "type": "bool"
      }
    ],
    "name": "PlotAvailabilityChanged",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "index",
        "type": "uint256"
      },
      {
        "name": "price",
        "type": "uint256"
      }
    ],
    "name": "plotForSale",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "sell",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "takeOffMarket",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getPlots",
    "outputs": [
      {
        "name": "",
        "type": "address[]"
      },
      {
        "name": "",
        "type": "bool[]"
      },
      {
        "name": "",
        "type": "uint256[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "index",
        "type": "uint256"
      }
    ],
    "name": "buyPlots",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "withDraw",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
  }
]
var account = web3.eth.accounts.privateKeyToAccount(
  "0x" + "1E6F35D84D9522005884EF0C6FDBDC9040E83621BDDE94D14FE22116354639CE"
);
var myAddr = "0xe13d1118c2eBC2D952760EDfd5625BdDe79250a2";
web3.eth.accounts.wallet.add(account);
web3.eth.defaultAccount = account.address;
console.log("coinbase account", web3.eth.defaultAccount);
console.log("2", web3.eth.accounts.wallet[0]);
console.log("3", web3.utils.checkAddressChecksum(web3.eth.defaultAccount));
console.log("4", web3.eth.Iban.isValid(web3.eth.defaultAccount));
console.log("5", web3.utils.isAddress(web3.eth.defaultAccount));
var privateKey =
  "0x70a300127a5ca8be4a4cc4c8e86496a9930612f43cf4e66d6c4284565cae495d";

var contractInstance = new web3.eth.Contract(contractABI, contractAddress, {
  from: myAddr
});
web3.eth.getBalance(contractAddress, (err, wei) => {
  let balance = web3.utils.fromWei(wei, "ether");
  console.log(balance, "bal");
});
contractInstance.methods.getPlots().call((err, res) => {
  console.log("items available", res);
});
function buyPlots(data, callback) {
  console.log("heree");
  // var BCdata = {};

  let tx_b = contractInstance.methods.buyPlots(0);
  // let tx_g = contractInstance.methods.withDraw()

  // let tx_c = contractInstance.methods.buyItem(0).call();
  // console.log(tx_c);
  let enc_tx = tx_b.encodeABI();
  data.price = web3.utils.toWei("0.01", "ether");
  // let trx = {
  //   to: '0xbe1586d34fc174090472e75dE7e6A16A2A3179fd',
  //   data: contractInstance.methods.buyItem(0).send({from: '0xe340c19cB05D6A437320174175d940BA0dF908a3', value: web3.utils.toWei("0.000001", "ether")}).encodeABI(),
  //   gas:4700000
  // }
  let trx = {
    gas: 4700000,
    data: enc_tx,
    value: data.price,
    from: data.ownername,
    to: contractAddress
  };
  web3.eth.accounts.signTransaction(trx, privateKey, function(error, signedTx) {
    if (error) {
      console.log("errrrrr", error);
    } else {
      web3.eth
        .sendSignedTransaction(signedTx.rawTransaction)
        .on("receipt", function(receipt) {
          console.log("receipt", receipt);
          callback(receipt);
        });
    }
  });
}
// buyPlots();
exports.buyPlots = buyPlots;
