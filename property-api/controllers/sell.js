
function sell(assetid, callback) {
  let _assetid = assetid;

  const { Pool } = require("pg");
  const pool = new Pool({
    user: "property",
    host: "localhost",
    database: "property",
    password: "rajesh123",
    port: 5432
  });
  pool.connect();
  pool.query(
    "SELECT * from sell WHERE assetid = ($1)",
    [_assetid],
    (err, res) => {
      if (err) {
        console.log("errrr", err);
      } else {
        console.log(res["rows"], "sell resp");
      }
      let data = {
        ipfshash: res["rows"][0]["ipfshash"],
        assetid: res["rows"][0]["assetid"],
        ownername: res["rows"][0]["ownername"],
        address: res["rows"][0]["address"],
        price: res["rows"][0]["price"],
        contractaddress: res["rows"][0]["contractaddress"]
      };
      console.log(data, "dataa");
      callback(data);
    }
  );
}
module.exports = {
  sell: sell
};
