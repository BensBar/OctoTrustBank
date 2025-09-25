const fs = require('fs');
const path = require('path');

function serveFile(req, res) {
  const base = path.join(__dirname, '..', 'public');
  const p = req.query.file || 'index.html';
  // BAD: no sanitization -> traversal
  const filePath = path.join(base, p);
  if (fs.existsSync(filePath)) return res.sendFile(filePath);
  res.status(404).send('Not found');
}
module.exports = { serveFile };
