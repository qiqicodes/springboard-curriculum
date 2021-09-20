const express = require("express");
const ExpressError = require("../expressError");
const router = express.Router();
const items = require("../fakeDb");

router.get("/", function (req, res, next) {
  try {
    res.json(items);
  } catch (error) {
    next(error);
  }
});

router.post("/", function (req, res, next) {
  try {
    if (!req.body.name || !req.body.price)
      throw new ExpressError("Name and price are required", 400);

    let newItem = { name: req.body.name, price: req.body.price };
    items.push(newItem);
    res.status(200).json({ added: newItem });
  } catch (error) {
    next(error);
  }
});

router.get("/:name", function (req, res, next) {
  try {
    let foundItem = items.find((item) => item.name === req.params.name);
    if (foundItem === undefined) {
      throw new ExpressError("Item not found", 404);
    }
    res.status(200).json(foundItem);
  } catch (error) {
    next(error);
  }
});

router.patch("/:name", function (req, res, next) {
  try {
    let foundItem = items.find((item) => item.name === req.params.name);
    if (foundItem === undefined) {
      throw new ExpressError("Item not found", 404);
    }

    foundItem.name = req.body.name;
    res.status(200).json({ updated: foundItem });
  } catch (error) {
    next(error);
  }
});

router.delete("/:name", function (req, res, next) {
  try {
    let foundItemIdx = items.findIndex((item) => item.name === req.params.name);
    console.log(foundItemIdx, req.params.name);
    if (foundItemIdx === -1) {
      throw new ExpressError("Item not found", 404);
    }

    items.splice(foundItemIdx, 1);
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
