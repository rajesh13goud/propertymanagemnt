const {Pool, Client} = require('pg');
const ethResults = ((req, res) => {
    const pool = new Pool({
        user:"property",
        host:"localhost",
        database:"property",
        password:"rajesh123",
        port:5432
    })
    pool.connect();
        pool.query("SELECT assetid from asset",(err,asset)=>{
            if(err) {
                return res.json(err.errmsg);
            }
    var assetid = req.params.assetid;
    // var invoiceId = req.params.invoiceId;
    var result = {pool:("SELECT assetid from asset")};
    
        loop:
        for (let i = 0; i < asset.address.length; i++) {
            if (asset.address[i]._id == assetid) {
                console.log("The invoice is : " + asset.address[i]);
                inv = asset.address[i];
                result.date = asset.address[i].date;
                result.blockHash = asset.address[i].blockHash;
                result.blockNumber = asset.address[i].blockNumber;
                result.transactionHash = asset.address[i].txhash;
                result.contract = asset.address[i].contractAddress;
                result.gasUsed = asset.address[i].gasUsed;
                asset.address[i].blockchain_status = true;
                //console.log(inv);
                asset.save();
                break loop;
            }
        }
        return res.json(result);
    })
    console.log("the result being sent is :" + result)
})
module.exports = {
    ethResults: ethResults
}