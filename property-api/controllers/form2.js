// const web3 = require('./web3');

function postdb1(assetid, callback) {
  // let con = data;
  const { Pool } = require("pg");
  let _assetid = assetid;
  // let _content = content;
  // let _price = price;
  // _assetid = '98e2da35-3a10-4c72-b765-fe0b73b89be7'
  setTimeout(function() {
    console.log("here get addBC :" + _assetid);
    // console.log('hahs' + _content);
    const pool = new Pool({
      user: "property",
      host: "localhost",
      database: "property",
      password: "rajesh123",
      port: 5432
    });
    // pool.connect();
    // pool.query("SELECT * from asset WHERE assetid = ($1)",
    // [_assetid],(error,result)=>{
    //     if(error){
    //         console.log(error)
    //     }else {
    //     console.log('success is here' , result['rows']);
    //     }

    //     data = {
    //         user_id: (result['rows'][0]['ownerid']),
    //         asset_id: (result['rows'][0]['assetid']),
    //         date: (result[('rows')][0]['entered']),
    //         act: "sell",
    //         price: (result['rows'][0]['price']),
    //         desc: "property"
    //     }
    //     console.log("data getting into bcn1 " + JSON.stringify(data));
    pool.connect();
    pool.query(
      "SELECT * from invoiced WHERE assetid = ($1)",
      [_assetid],
      (err, res) => {
        if (err) {
          console.log(err);
        } else {
          console.log("add in the bc" + JSON.stringify(res["rows"]));
        }
        var obj = {
          assetid: _assetid,
          blockHash: res["rows"][0]["blockhash"],
          blockNumber: res["rows"][0]["blocknumber"],
          contract: res["rows"][0]["contract"],
          gasUsed: res["rows"][0]["gasused"],
          trxUsed: res["rows"][0]["trxhash"]
        };
        console.log("mama" + JSON.stringify(obj.contract));
        callback(obj);
      }
    );
  }, 6000);
}

module.exports = {
  postdb1: postdb1
};
