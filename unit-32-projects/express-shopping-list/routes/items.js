const { response } = require("express");
const express = require("express");
const router = new express.Router();

// Todo: GET /items - this should render a list of shopping items.
// sample response

// [{“name”: “popsicle”, “price”: 1.45}, {“name”:”cheerios”, “price”: 3.40}]

// Todo: POST /items - this route should accept JSON data and add it to the shopping list.
// sample request/response

// {“name”:”popsicle”, “price”: 1.45} => {“added”: {“name”: “popsicle”, “price”: 1.45}}

// Todo: GET /items/:name - this route should display a single item’s name and price.
// sample request/response

// {“name”: “popsicle”, “price”: 1.45}

// Todo: PATCH /items/:name, this route should modify a single item’s name and/or price.
// sample request/response

// {“name”:”new popsicle”, “price”: 2.45} => {“updated”: {“name”: “new popsicle”, “price”: 2.45}}

// Todo: DELETE /items/:name - this route should allow you to delete a specific item from the array.
// sample request/response

// {message: “Deleted”}

module.exports = router;
