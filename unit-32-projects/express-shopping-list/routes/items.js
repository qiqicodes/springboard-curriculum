const express = require("express");
const router = new express.Router();

// Todo: GET /items - this should render a list of shopping items.
router.get("/", function (req, res, next) {
  try {
  } catch (error) {
    next(error);
  }
});
// sample response

// [{“name”: “popsicle”, “price”: 1.45}, {“name”:”cheerios”, “price”: 3.40}]

// Todo: POST /items - this route should accept JSON data and add it to the shopping list.
router.post("/", function (req, res, next) {
  try {
  } catch (error) {
    next(error);
  }
});
// sample request/response

// {“name”:”popsicle”, “price”: 1.45} => {“added”: {“name”: “popsicle”, “price”: 1.45}}

// Todo: GET /items/:name - this route should display a single item’s name and price.
router.get("/:name", function (req, res, next) {
  try {
  } catch (error) {
    next(error);
  }
});
// sample request/response

// {“name”: “popsicle”, “price”: 1.45}

// Todo: PATCH /items/:name, this route should modify a single item’s name and/or price.
router.patch("/:name", function (req, res, next) {
  try {
  } catch (error) {
    next(error);
  }
});
// sample request/response

// {“name”:”new popsicle”, “price”: 2.45} => {“updated”: {“name”: “new popsicle”, “price”: 2.45}}

// Todo: DELETE /items/:name - this route should allow you to delete a specific item from the array.
router.delete("/:name", function (req, res, next) {
  try {
  } catch (error) {
    next(error);
  }
});
// sample request/response

// {message: “Deleted”}

module.exports = router;
