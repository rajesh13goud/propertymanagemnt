const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const contractABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "assetId",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "ownerId",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "assetPrice",
        "type": "uint256"
      }
    ],
    "name": "addedAsset",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "assetId",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "owner",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "dates",
        "type": "bytes32"
      }
    ],
    "name": "ownerShipChange",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "assetId",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "maintenanceDesc",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "maintainer",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "name": "date",
        "type": "bytes32"
      }
    ],
    "name": "maintenance",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "userId",
        "type": "bytes32"
      },
      {
        "name": "Assetid",
        "type": "bytes32"
      },
      {
        "name": "activityDate",
        "type": "bytes32"
      },
      {
        "name": "presentAct",
        "type": "bytes32"
      },
      {
        "name": "assetPrice",
        "type": "uint256"
      },
      {
        "name": "aName",
        "type": "bytes32"
      }
    ],
    "name": "setAssetData",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "Assetid",
        "type": "bytes32"
      }
    ],
    "name": "getAssetData",
    "outputs": [
      {
        "name": "owner",
        "type": "bytes32[]"
      },
      {
        "name": "assetHistory",
        "type": "bytes32[]"
      },
      {
        "name": "activityHistory",
        "type": "bytes32[]"
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
        "name": "Assetid",
        "type": "bytes32"
      },
      {
        "name": "newOwnerid",
        "type": "bytes32"
      },
      {
        "name": "date",
        "type": "bytes32"
      }
    ],
    "name": "ownershipChange",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "Assetid",
        "type": "bytes32"
      },
      {
        "name": "maintenanceInfo",
        "type": "bytes32"
      },
      {
        "name": "date",
        "type": "bytes32"
      }
    ],
    "name": "service",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "AssetId",
        "type": "bytes32"
      }
    ],
    "name": "maintenanceHistory",
    "outputs": [
      {
        "name": "desc",
        "type": "bytes32[]"
      },
      {
        "name": "dates",
        "type": "bytes32[]"
      },
      {
        "name": "owners",
        "type": "bytes32[]"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
]
  const contractAddress = '0x266A3B89910B6CF1E6A5Dd296910eAa09912A134';

  let contractInstance = new web3.eth.Contract(contractABI,contractAddress)

  // let res = contractInstance.methods.setPropData("ac_01","1",123,"buying",310000,"Land");
  // console.log(res.toString());



