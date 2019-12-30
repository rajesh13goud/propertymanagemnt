const Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/3f515a48f1d84d5bb73607d54389b693"));

var contractAddress = '0x264Bb7bcD9AeD5E124c76f96dC7D3c30C5BA1256';
var contractABI = [
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
];
var instance = new web3.eth.Contract(contractABI,contractAddress);
var privateKey = '0x1E6F35D84D9522005884EF0C6FDBDC9040E83621BDDE94D14FE22116354639CE';
function setDataBC(data,callback){
  console.log('helkl')
    
    var BCdata = {};
    console.log('BCdata',BCdata);
    let obj = {
        to : contractAddress,
        data : instance.methods.setAssetData(web3.utils.asciiToHex(data.user_id), web3.utils.asciiToHex(data.asset_id),web3.utils.asciiToHex(data.date),web3.utils.asciiToHex(data.act),data.price,web3.utils.asciiToHex(data.desc)).encodeABI(),
        gas : 4700000
    }
    console.log('here in the obj')
    web3.eth.accounts.signTransaction(obj,privateKey,(err,res)=>{
      if(err){
        console.log('error ra rey',err);
        // return callback(err);
      }
      console.log('then moved here ')
    web3.eth.sendSignedTransaction(res.rawTransaction)
    .once('transactionHash',function(hash){console.log('hash --> ',hash)})
    .on('error',function(error){callback(error)})
    .then(function(receipt){
      BCdata.blockHash = receipt.blockHash;
      BCdata.blockNumber = web3.utils.hexToNumber(receipt.blockNumber);
      BCdata.transactionHash = receipt.logs[0].transactionHash;
      BCdata.gasUsed = web3.utils.hexToNumber(receipt.cumulativeGasUsed);
      console.log('receipt',receipt);
      BCdata.contract = receipt.logs[0].address;
      console.log('trxhash',receipt.logs[0].transactionHash);
      callback(BCdata);
    })
})
}


function getDataBC(assetId,callback){
    instance.methods.getAssetData(web3.utils.asciiToHex(assetId)).call({gas:90000000},(err,res)=>{
    var history = [];
    for(let i=0;i<res[0].length;i++){
    history.push({owner : web3.utils.hexToAscii(res[0][i]), date : web3.utils.hexToAscii(res[2][i])});
    }
    callback(history);
    })
}


 function setMaintenanceBC(data){
     let obj ={
         to : contractAddress,
         data : instance.methods.service(web3.utils.asciiToHex(data.assetId),web3.utils.asciiToHex(data.desc),web3.utils.asciiToHex(data.date)).encodeABI(),
         gas : 4700000
     }
     web3.eth.accounts.signTransaction(obj,privateKey,(err,res)=>{
         web3.eth.sendSignedTransaction(res.rawTransaction,(err,result)=>{
         callback(result.transactionHash);
        })
    })
 }

  function getMaintenanceBC(assetId,callback){
      instance.methods.maintenanceHistory(assetId).call({gas: 4700000},(err,res)=>{
          var maintenance = [];
          for(let i=0;i<res.length;i++){
              maintenance.push({description : web3.utils.hexToAscii(res[0][i]),date : web3.utils.asciiToHex(res[1][i]),owner : web3.utils.hexToAscii(res[2][i])})
          }
      })
  }

  exports.setDataBC = setDataBC;
  exports.getDataBC = getDataBC;
  exports.setMaintenanceBC = setMaintenanceBC;
  exports.getMaintenanceBC = getMaintenanceBC;