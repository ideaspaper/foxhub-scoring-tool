const constants = require('./constants');
const fs = require('fs');
const prompt = require('prompt');

module.exports = {
  read,
  write
};

function read(print = false) {
  if (fs.existsSync(constants.dbConfFile)) {
    let retVal = JSON.parse(fs.readFileSync(constants.dbConfFile, 'utf8'));
    print ? console.log(retVal) : {};
    return retVal;
  } else {
    throw (new Error(`${constants.dbConfFile} ${constants.fsFileNotFound}`));
  }
}

function write() {
  let fields = ['host', 'port', 'user', 'database', 'password'];
  prompt.start();
  prompt.get(fields, function (err, result) {
    fs.writeFileSync(constants.dbConfFile, JSON.stringify(result));
  });
}