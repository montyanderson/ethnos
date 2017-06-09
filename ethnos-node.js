const url = require("url");
const zlib = require("zlib");
const http = require("http");
const web3 = require("./lib/web3");
const mimeTypes = require("./lib/mimeTypes");
const ethnos = require("./lib/ethnos");

const server = http.createServer((req, res) => {
	const pathname = url.parse(req.url).pathname;
	const levels = pathname.split("/").filter(l => !!l);

	console.log(levels);

	switch(levels.shift()) {
		case "a":
			const address = levels.shift();
			const fileName = levels.join("/");
			console.log(address, fileName);

			const file = ethnos.getFile.call(address, fileName);

			res.writeHead(200, {
				"Content-Type": mimeTypes[file[1]]
			});

			let data = Buffer.from(file[2].slice(2), "hex");

			console.log(data.length, data.toString());

			if(file[0] == 1) {
				data = zlib.inflateRawSync(data);
			}

			console.log(data.length, data.toString());

			res.end(data);

			break;
	}
});

server.listen(8202);
