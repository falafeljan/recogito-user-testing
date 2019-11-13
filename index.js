const express = require("express");
const app = express();

app.get("/", function(req, res) {
  res.send("Hello World");
});

const server = app.listen(3000, () =>
  process.stdout.write(`Server listening on port ${server.address().port}.\n`)
);
