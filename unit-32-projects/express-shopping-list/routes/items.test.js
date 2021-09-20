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
  it("retrieves all items via GET method", async () => {
    const res = await request(app).get("/items");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([flower]);
    expect(res.body).toHaveLength(1);
  });
});

describe("POST /items", () => {
  it("creates and adds an item to current items list via POST method", async () => {
    const newItem = { name: "tree", price: 10 };
    const res = await request(app).post("/items").send(newItem);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ added: newItem });
  });
  it("responds with 400 if name is missing", async () => {
    const res = await request(app).post("/items").send({});
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({
      message: "Name and price are required",
      status: 400,
    });
  });
  it("responds with 400 if price is missing", async () => {
    const res = await request(app).post("/items").send({ name: "noprice" });
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({
      message: "Name and price are required",
      status: 400,
    });
  });
});
