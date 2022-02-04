const express = require("express");
const app = express();
const port = 4000;

app.get("/", (req, res) => {
  res.send({ sup: "Cool" });
});

app.get("/api/:id", (req, res) => {
  const cool = req.method;
  res.send({ sup: "API", method: cool, id: req.params.id });
});

app.listen(port, () => {
  console.log("listening on port " + port);
});
