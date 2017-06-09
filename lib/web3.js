const Web3 = require("web3");
const web3 = module.exports = new Web3();
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:8545"));
