const express = require("express");
const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log("server started successfully");
});

app.get("/", (req, res) => {
  res.send("Hello World");
});