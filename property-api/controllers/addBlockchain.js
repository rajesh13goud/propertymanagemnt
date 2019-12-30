// const addBCHandler = (req, res) => {
//     const {Pool, Client} = require('pg')
// // const log = require('./signin');


// const pool = new Pool({
//     user:"property",
//     host:"localhost",
//     database:"property",
//     password:"rajesh123",
//     port:5432
// })

// // let content = data;
// pool.connect();
//     // jwt.verify(cookie.AssetzChain, "cipher", function (err, user) {
//     //     if (err) {
//     //         res.send(err);
//     //     }
//     //     else {
//             //console.log("The search is : "+user.mobile)
//             function bc(assetid, err, asset) {
//                 if (err || asset == null) {
//                     console.log(err.errmsg);
//                     return res.JSON(err);
//                 }
//                 console.log(asset)
//                 var make = asset.make;
//                 var userid = asset.user_id;
//                 var inv;
//                 //res.send(result.invoice);
//                 loop:
//                 for (let i = 0; i < asset.invoices.length; i++) {
//                     if (asset.invoices[i]._id == invoiceId) {
//                         inv = asset.invoices[i];
//                         console.log(inv);
//                         //asset.invoices[i].blockchain_status = true;
//                         asset.save();
//                         break loop;
//                     }
//                 }
//                 data = {
//                     user_id: (JSON.stringify(asset.user_id)).replace(/"/g, ''),
//                     asset_id: (JSON.stringify(asset._id)).replace(/"/g, ''),
//                     date: inv.date,
//                     act: "buy",
//                     price: inv.price,
//                     desc: "phone"
//                 }

//                 console.log("The data getting into the blockchain : " + JSON.stringify(data))

//                 web3.setDataBC(data, (result) => {
//                     if (result == err) {
//                         var data = {
//                             status: "error",
//                             message: "Couldn't add to blockchain"
//                         }
//                         return res.JSON(data);
//                     }
//                     console.log("We need to print this :" + result);
//                     pool.query(assetId, (err, asset) => {
//                         if (err) {
//                             return res.JSON(err.errmsg);
//                         }
//                         loop:
//                         for (let i = 0; i < asset.invoices.length; i++) {
//                             if (asset.invoices[i]._id == invoiceId) {
//                                 inv = asset.invoices[i];
//                                 asset.invoices[i].blockHash = result.blockHash;
//                                 asset.invoices[i].blockNumber = result.blockNumber;
//                                 asset.invoices[i].txhash = result.transactionHash;
//                                 asset.invoices[i].contractAddress = result.contract;
//                                 asset.invoices[i].gasUsed = result.gasUsed;
//                                 //asset.invoices[i].blockchain_status = true;
//                                 //console.log(inv);
//                                 asset.save();
//                                 break loop;
//                             }
//                         }

//                     })
//                     res.send(result);
//                 })
//             })
//         }
//     // })

// // }

// module.exports = {
//     // addBCHandler: addBCHandler
// }





















