const web3 = require("./web3");
function postdb2(assetid, content, callback) {
  const { Pool } = require("pg");
  // const log = require('./signin');

  const pool = new Pool({
    user: "property",
    host: "localhost",
    database: "property",
    password: "rajesh123",
    port: 5432
  });
  pool.connect();

  pool.query(
    "SELECT assetid, ownerid, entered,price from asset WHERE assetid = ($1)",
    [assetid],
    (err, res) => {
      if (err) {
        console.warn(err);
      } else {
        // console.log("uffeeeeeeeee", res["rows"][0]['ownerid']);
        console.log("rajahaja");
      }
      let data = {
        user_id: res["rows"][0]["ownerid"],
        asset_id: res["rows"][0]["assetid"],
        date: res["rows"][0]["entered"],
        act: "sell",
        price: res["rows"][0]["price"],
        desc: "property"
      };
      console.log("data getting into bcn1 " + JSON.stringify(data));

      web3.setDataBC(data, result => {
        const pool = new Pool({
          user: "property",
          host: "localhost",
          database: "property",
          password: "rajesh123",
          port: 5432
        });
        if (result == err) {
          var data = {
            status: "error",
            message: "couldn't add to blockchain"
          };
          return res.JSON(data);
        }
        console.log("we need: " + JSON.stringify(result));
        let obj = {
          blockHash: result.blockHash,
          blockNumber: result.blockNumber,
          transactionHash: result.transactionHash,
          gasUsed: result.gasUsed,
          contract: result.contract
        };
        callback(obj);
        // pool.connect();
        // pool.query(
        //   "UPDATE sell SET contractaddress=($1) WHERE assetid=($2)",
        //   [obj.contract],
        //   [assetid],
        //   (err, res) => {
        //     if (err) {
        //       console.log("err", err);
        //     } else {
        //       console.log("respo", res);
        //     }
        //   }
        // );
        pool.connect();
        pool.query(
          "INSERT INTO invoiced(blockhash,contract,trxhash,assetid,multihash,created,doctype,gasused,blocknumber)values($1,$2,$3,$4,$5,$6,$7,$8,$9)",
          [
            obj.blockHash,
            obj.contract,
            obj.transactionHash,
            assetid,
            content,
            new Date(),
            "LAND DOCS",
            obj.gasUsed,
            obj.blockNumber
          ],
          (err, res) => {
            if (err) {
              console.log(err);
            } else {
              console.log("finally" + JSON.stringify(res));
            }
          }
        );
        pool.connect();
        // pool.query("UPDATE sell SET contractaddress=($1) WHERE assetid=($2)",
        // [obj.contract],[assetid],(err,res) =>{
        //   if(err){
        //     console.log('errupdate')
        //   } else{
        //     console.log('update', res)
        //   }
        // })
      });
    }
  );
}
exports.postdb2 = postdb2;
