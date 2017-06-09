const fs = require("fs");
const web3 = new (require("web3"));

web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));

const _domainPrice = 20000000000000000;
var untitled_ethnosContract = web3.eth.contract(JSON.parse(fs.readFileSync(__dirname + "/Ethnos.abi", "utf8")));

var untitled_ethnos = untitled_ethnosContract.new(
   _domainPrice,
   {
     from: web3.eth.accounts[0],
     data: "0x" + fs.readFileSync(__dirname + "/Ethnos.bin", "utf8"),
     gas: '810038'
   }, function (e, contract){
    console.log(e, contract);
    if (typeof contract.address !== 'undefined') {
         console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
    }
 })
