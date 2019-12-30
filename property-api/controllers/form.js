// const web3 = require('./web3');
function postdb(data, ownername, address, location, price, assetid, callback) {
  let content = data;
  let _ownername = ownername;
  let _address = address;
  let _location = location;
  let _price = price;
  let _assetid = assetid;
  // let _contractaddress= '0x19D931b87b7237805ABCEc2c0E4A7D591F371B7e';
  // let _ownerid = ownerid;
  console.log(content);
  // console.log(email);
  console.log(ownername);

  const { Pool, Client } = require("pg");
  // const log = require('./signin');

  const pool = new Pool({
    user: "property",
    host: "localhost",
    database: "property",
    password: "rajesh123",
    port: 5432
  });
  // let content = data;
  pool.connect();
  // var ass = pool.query("SELECT * from login");
  // console.log("user logged details: ",ass);
  pool.query(
    "INSERT INTO asset(multihash,entered,ownername,location,price,address,assetid)values($1,$2,$3,$4,$5,$6,$7)",
    [content, new Date(), _ownername, _location, _price, _address, _assetid],
    (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log("row updated:asset ");
      }
      pool.query(
        "SELECT assetid,entered,ownerid from asset WHERE ownername = ($1)",
        [_ownername],
        (error, result) => {
          if (error) {
            console.log(error, "selected");
          } else {
            console.log("successfu :", result["rows"]);
          }

          data = {
            user_id: result["rows"][0]["ownerid"],
            asset_id: result["rows"][0]["assetid"],
            date: result["rows"][0]["entered"],
            act: "sell",
            price: _price,
            desc: "property"
          };
          console.log("data getting into bc " + JSON.stringify(data));
          callback(data);
          // web3.setDataBC(data ,(result) =>{
          //     if(result == err){
          //         var data = {
          //             status: "error",
          //             message: "couldn't add to blockchain"
          //         }
          //         return res.JSON(data);
          //     }
          //     console.log("we need: " + JSON.stringify(result));
          //     // callback(result);
          //     let blockHash = result.blockHash;
          //     let blockNumber = result.blockNumber;
          //     let transactionHash = result.transactionHash;
          //     let gasUsed = result.gasUsed;
          //     let contract = result.contract;
          //     pool.connect();
          //     pool.query("INSERT INTO invoiced(blockhash,contract,trxhash,assetid,multihash,created,doctype,price,gasused,blocknumber)values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
          //     [blockHash,contract,transactionHash,_assetid,content,new Date(),'LAND DOCS',_price,gasUsed,blockNumber],
          //     (err,res) =>{
          //         if(err){
          //             console.log(err)
          //         } else {
          //             console.log('finally' + JSON.stringify(res));

          //         }
          //     })
          // })
          // callback(result)
        }
      );
      pool.connect();
      pool.query(
        "INSERT INTO sell(ipfshash,assetid,ownername, address,price,contractaddress)values($1,$2,$3,$4,$5,$6)",
        [
          content,
          assetid,
          _ownername,
          _location,
          _price,
          "0x27E4d9B683FeeB6296C7De45e53bE3A74D811232"
        ],
        (error, result) => {
          if (error) {
            console.log(error, "ravatleduraaaaa");
          } else {
            console.log("row updated: SELL");
          }
        }
      );
    }
  );
}

module.exports = {
  postdb: postdb
};
