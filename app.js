const express = require("express");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.listen(PORT, () => {
  console.log(`server is runing on PORT:${PORT}`);
});

module.exports = app;
