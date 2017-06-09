const fs = require("fs");
const zlib = require("zlib");
const argv = require("./lib/argv");
const web3 = require("./lib/web3");
const ethnos = require("./lib/ethnos");
const mimeTypes = require("./lib/mimeTypes");

if(argv.pushFile) {
	if(!argv.mimeType) {
		throw new Error("Please provide a --mimeType!");
	}

	if(typeof argv.fileName != "string") {
		throw new Error("Please provide a --fileName");
	}

	const inFile = fs.readFileSync(argv.inFile, "utf8");
	console.log(`Read ${JSON.stringify(argv.inFile)}, ${inFile.length} bytes.`);

	const compressedFile = zlib.deflateRawSync(inFile);
	console.log(`Compressed using raw-deflate, ${compressedFile.length} bytes.`);

	const mimeTypeIndex = mimeTypes.indexOf(argv.mimeType);

	if(mimeTypeIndex < 0) {
		throw new Error("Couldn't find that mime type!");
	}

	const args = [
		argv.fileName,
		inFile.length < compressedFile.length ? 0 : 1,
		mimeTypeIndex,
		"0x" + (inFile.length < compressedFile.length ? inFile : compressedFile).toString("hex")
	];

	ethnos.updateFile.sendTransaction(...args, {
		from: web3.eth.coinbase,
		gas: 400000
	});
}
