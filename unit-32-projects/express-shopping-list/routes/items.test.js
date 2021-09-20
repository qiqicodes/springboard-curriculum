process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../app");
const items = require("../fakeDb");

let flower = { name: "flower", price: 2 };

beforeEach(function () {
  items.push(flower);
});

afterEach(function () {
  items.length = 0;
});
