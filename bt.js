

let key = "5fef4dba0d37418a8baae9f1392567bcf51987dc";
let secret = "dc3c37769fe513c8ce4a08e3bd6d1562859e4077";


blocktrail = require('blocktrail-sdk');

client = blocktrail.BlocktrailSDK({
  apiKey: key,
  apiSecret: secret,
  network: "BTC",
  testnet: false});

client.address('1NcXPMRaanz43b1kokpPuYDdk6GGDvxT2T',
    function(err, address) {
      console.log(address.balance);
    });

client.blockLatest(
    function(err, block) {
      console.log(block.hash);
    });
