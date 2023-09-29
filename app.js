const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use(cors());

app.use("/", require("./routes/messageRoute"));

const PORT = process.env.PORT;

// app.get("/", (req, res) => {
//   res.send("<h1>Hello World</h1>");
// });

app.listen(PORT, () => {
  console.log(`server is runing on PORT:${PORT}`);
});

module.exports = app;
