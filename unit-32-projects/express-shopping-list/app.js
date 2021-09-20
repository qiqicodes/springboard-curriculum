const express = require("express");
const ExpressError = require("./expressError");
const itemsRoutes = require("./routes/items");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());
app.use("/items", itemsRoutes);

app.use(function (req, res, next) {
  return new ExpressError("Not Found", 404);
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);

  return res.json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
