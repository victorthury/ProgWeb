const http = require('http');
const path = require('path');
const fs = require('fs');

const dirArg =  process.argv[2];
const directoryPath = path.join(__dirname, dirArg);

const arrayOfFiles = fs.readdirSync(directoryPath);

const stringOfFileNames = arrayOfFiles.join('\n');

http.createServer(function(req, res){
  res.end(stringOfFileNames)
}).listen(3000);