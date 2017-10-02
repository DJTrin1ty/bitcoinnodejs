

const express = require("express");
const app = express();
const request = require("request");
const bodyparser = require("body-parser");
const bitcore = require("bitcore-lib");


app.use(bodyparser.urlencoded({
  extended: true
}));

app.use(bodyparser.json());

app.set("view engine", "ejs");

function brainWallet(uinput, callback) {
  let input = new Buffer(uinput);
  let hash = bitcore.crypto.Hash.sha256(input);
  let bn = bitcore.crypto.BN.fromBuffer(hash);
  let pk = new bitcore.PrivateKey(bn).toWIF();
  let addy = new bitcore.PrivateKey(bn).toAddress();
  callback(pk, addy);
};

function getPrice(returnPrice){
  request({
    url:"https://bitstamp.net/api/v2/ticker/BTCUSD",
    json: true
  }, function(err, res, body) {
     returnPrice(body.last);
  });
};


app.get("/", function(req, res){
    getPrice(function(lastPrice){
      res.render("index", {
          lastPrice: lastPrice
      });
    });
});

app.get("/brain", function(req, res){
  getPrice(function(lastPrice){
    res.render("brain", {
        lastPrice: lastPrice
    });
  });
});

app.get("/converter", function(req, res){
  getPrice(function(lastPrice){
    res.render("converter", {
        lastPrice: lastPrice
    });
  });
});

app.post("/wallet", function(req, res){
    let brainsrc = req.body.brainsrc;
    console.log(brainsrc);
    brainWallet(brainsrc, function(priv, addr){
      res.send("The Brain Wallet of: " + brainsrc + "<br>Addy: "
      + addr + "<br>Private Key: " + priv);
    });

});

app.listen(8080, function(){
  console.log("go");
});
