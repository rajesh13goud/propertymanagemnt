//const cookieParser = require('cookie-parser');
const multer = require('multer');
//const jwt = require('jsonwebtoken');
const ocr = require('./ocr');
const ipfs = require('./ipfs');


var upload = multer();

const sendImageHandler = (upload.any(), function (req, res) {
    
    var ipfsURL = "https://gateway.ipfs.io/ipfs/"
    console.log("it is here atleast");
    console.log(req.files);
    if (req.files == null || req.files == 'undefined') {
        response = {
            status: "error",
            message: "The file was not uploaded properly"
        }
        return res.json(response);
    }
    console.log(req.files);
    ipfs.IpfsUpload(req.files[0].buffer, (result) => {
        if (result.status == "error") { return res.send(result); }
        //console.log(result[0].hash);
         var multihash = result[0].hash;
        ocr.ocrCall(ipfsURL + result[0].hash, (result) => {

             if (result.status == "error") {
                 return res.send(result);
             }
         })
        //  var asset = new Assets(
        //     {
        //         assetId: uuidv4(),
        //         user_id: user._id,
        //         make: result.make
        //     }
        // )
        // let invoice = {
        //     invoiceId: uuidv4(),
        //     retailer: result.retailer,
        //     date: result.date,
        //     price: result.amount,
        //     multihash: multihash,
        //     invoiceType: 'INV'
        // }
        // var invId;
        // asset.invoices.push(invoice)
        // console.log(asset);
        // asset.save(function (err, asset) {
        //     if (err) {
        //         console.log(err)
        //         let response = {
        //             status: 'error'
        //         }
        //         return res.json(response);
        //     }
        //     console.log("Asset saved");
        //     loop:
        //     for (let i = 0; i < asset.invoices.length; i++) {
        //         if (asset.invoices[i].ocr_status == false) {
        //             invId = asset.invoices[i]._id;
        //             console.log(invId);
        //             break loop;
        //         }
        //     }
        //     Users.findById(user._id, (err, user) => {
        //         if (err) {
        //             let response = {
        //                 status: 'error',
        //                 message: err
        //             }
        //             return res.json(response);
        //         }
        //         user.assets.push(asset._id);
        //         user.save((err, result) => {
        //             if (err) {
        //                 let response = {
        //                     status: 'error'
        //                 }
        //                 return res.json(response);
        //             }
        //             let response = {
        //                 status: 'Success',
        //                 asset: asset,
        //                 invoiceId: invId
        //             }
        //             console.log("This is the response : " + JSON.stringify(response))
        //             res.json(response);
        //         })
        //     })
        // })


        
    })
    //      console.log(req.files);
    //      ipfs.ipfsUpload(req.files[0].buffer, (result) => {
    //          if (result.status == "error") { return res.send(result); }
    // //         //console.log(result[0].hash);
    //          var multihash = result[0].hash;
    //      ocr.ocrCall(ipfsURL + result[0].hash, (result) => {

    //          if (result.status == "error") {
    //              return res.send(result);
    //         }
    //      })
    // })
                
})     
        

module.exports = {
    sendImageHandler: sendImageHandler
}