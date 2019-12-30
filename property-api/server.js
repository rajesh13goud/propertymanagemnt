const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const fs = require("fs");
const knex = require("knex");
const pg = require("pg");
const axios = require("axios");
// const passport = require('passport');
const multer = require("multer");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
var uuidv4 = require("uuid/v4");
var session = require("express-session");
//const fileUpload = require('express-fileupload');
const ipfs = require("./controllers/ipfs");
const ethResults = require("./controllers/ethresults");
const ocr = require("./controllers/ocr");
const gasPrice = require("./controllers/gas");
const addBC = require("./controllers/addBlockchain");
const wordsearch = require("./controllers/wordsearch");

// app.use(express.static(__dirname + '/controllers'));
// app.engine('html', require('ejs').renderFile);
// app.set('views', __dirname + '/controllers');
// app.set('view engine', 'html');

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");
const sendImage = require("./controllers/sendImage");
const auth = require("./controllers/auth");
const img = require("./controllers/img");
const form = require("./controllers/form");
const form1 = require("./controllers/form2");
const form3 = require("./controllers/form3");
const sellItem = require("./controllers/sell");
const buyPlot = require("./controllers/buyProp");

const ocrResults = require("./controllers/ocrResults");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "property",
    password: "rajesh123",
    database: "property"
  }
});
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
// app.use(cookieParser());
var upload = multer();
//app.use(fileUpload());
//app.use(cookieParser());

app.get("/", (req, res) => {
  var cookie = req.cookies;
  console.log(cookie.users);
  jwt.verify(cookie.users, "cipher", function(err, user) {
    if (err) {
      console.log(err.message);
    }
    res.setHeader("set-cookie", "asset=assetid");

    res.send(db.users);
  });
});
app.post("/signin", (req, res) => {
  signin.signinHandler(req, res, db, bcrypt);
});
app.post("/register", (req, res) => {
  register.registerHandler(req, res, db, bcrypt);
});
app.get("/profile/:id", (req, res) => {
  profile.profileHandler(req, res, db);
});
app.put("/image", (req, res) => {
  image.imageHandler(req, res, db);
});
app.post("/img", (req, res) => {
  img.imgHandler(req, res);
});
app.post("/seller", (req, res) => {
  form.formHandler(req, res);
});
//app.get('/ocrResults/:assetId/:invoiceId', (req, res) =>{ocrResults.ocrRes(req,res)});
app.post("/sendImage", upload.any(), (req, res) => {
  var cookie = req.cookies;
  const { ownername, location, address, price } = req.body;
  if (!location || !ownername || !address || !price) {
    return res.status(400).json("incorrect form submission");
  }
  var ipfsURL = "https://gateway.ipfs.io/ipfs/";
  console.log("it is here atleast");
  console.log(req.files);

  //console.log(req.files);
  // db('docs').insert({docshash: multihash})
  if (req.files == null || req.files == "undefined") {
    let response = {
      status: "error",
      message: "The file was not uploaded properly"
    };
    return res.json(response);
  }
  // const imageIn = req.files;
  ipfs.ipfsUpload(req.files[0].buffer, result => {
    // const {email, docshash} = req.body;
    if (result.status == "error") {
      return res.send(result);
    }
    //console.log(result[0].hash);

    var multihash = result[0].hash;
    var assetid = uuidv4();
    var url = ipfsURL + multihash;
    console.log(url);

    form.postdb(
      multihash,
      ownername,
      address,
      location,
      price,
      assetid,
      data => {
        if (data.status == "error") {
          return res.send(data);
        }
        console.log("resss", data);
        res.send(data.asset_id);
        // setTimeout(() => {
        //   res.redirect("/saved/" + assetid);
        // }, 9000);
      }
    );
    // res.send(assetid)
    // res.redirect("/addBlockchain/" + assetid);
    app.get("/gas/", (req, res) => {
      //  var assetid = req.assetid;
      gasPrice.getGasPrice(result => {
        let obj = {
          message: result.gasPrice,
          txCost: result.txFee,
          assetid: assetid,
          ipfshash: multihash
        };
        // console.log(obj);
        res.send(obj);

        // res.redirect('/ethResults/:assetid/');
      });
      // res.redirect('/save/'+assetid);
    });
    app.get("/sell/", (req, res) => {
      sellItem.sell(assetid, result => {
        let data = {
          ipfshash: result.ipfshash,
          assetid: result.assetid,
          ownername: result.ownername,
          address: result.address,
          price: result.price,
          contractaddress: result.contractaddress
        };
        res.send(data);
        // console.log(data, "sent to sell");
        // buyPlot.buyPlots(data, result => {
        //   console.log(JSON.stringify(result));
        //   res.json(result);
        // });
      });
    });
    app.get("/buy/", (req, res) => {
      // var assetid = 0
      // var price = result.price;
      let data = {
        assetid: 0,
        price: 2,
        ownername: 'rajesh'
      };
      buyPlot.buyPlots(data,result => {
       
        // console.log(JSON.stringify(result));
        res.send(result);
      });
    });
  });
});
app.get("/ethResults/:assetid/", (req, res) => {
  ethResults.ethResults(req, res);
});
// app.get("/addBlockchain/:assetid/", (req, res) => {addBC.addBCHandler(req,res)});

app.get("/saved/:assetid", function(req, res) {
  // let cookie = req.cookies;
  let assetid = req.params.assetid;
  console.log("asede", assetid);
  let multihash = req.params.multihash;
  form3.postdb2(assetid, multihash, result => {
    res.send(result);
  });
});
app.get("/addBlockchain/:assetid", (req, res) => {
  let assetid = req.params.assetid;
  console.log("asset in BEaddBlock", assetid);
  form1.postdb1(assetid, result => {
    let obj = {
      assetid: result.assetid,
      blockhash: result.blockHash,
      blocknumber: result.blockNumber,
      contract: result.contract,
      gasused: result.gasUsed,
      trxused: result.trxUsed
    };
    res.send(obj);
    console.log("ooobbbjj", obj);
  });
});

app.listen(4000, () => {
  console.log("its working");
});
