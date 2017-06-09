const fs = require("fs");
const web3 = require("./web3");

const Ethnos = web3.eth.contract(JSON.parse(fs.readFileSync(__dirname + "/../contract/Ethnos.abi", "utf8")));

const ethnos = module.exports = Ethnos.at("0x502851bAF3C4CAC614505D49C3631bfd7c98D088");
