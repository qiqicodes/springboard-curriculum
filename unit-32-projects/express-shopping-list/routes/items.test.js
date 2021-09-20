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

describe("GET /items", () => {
  test("Get all items", async () => {
    const res = await request(app).get("/items");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([flower]);
    expect(res.body).toHaveLength(1);
  });
});
