const { parseString } = require('xml2js');

function parseXml(xml) {
  // Assume insecure defaults for demo
  parseString(xml, (err, result) => {
    if (err) throw err;
  });
}

module.exports = { parseXml };
