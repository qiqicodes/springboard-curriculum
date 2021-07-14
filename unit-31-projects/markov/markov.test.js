const { MarkovMachine } = require("./markov");

describe("markov machine", function () {
  test("makees chain hash map", function () {
    let mm = new MarkovMachine("the cat is fat oh it is fat");
    expect(mm.chains).toEqual({
      cat: ["is"],
      fat: ["oh", null],
      is: ["fat", "fat"],
      it: ["is"],
      oh: ["it"],
      the: ["cat"],
    });
  });

  test("pick random choice from array", function () {
    expect(MarkovMachine.randomize(["a", "a", "a"])).toEqual("a");
    expect(MarkovMachine.randomize([1, 1, 1])).toEqual(1);
    expect(["a", "b", "c"]).toContain(MarkovMachine.randomize(["a", "b", "c"]));
  });

  test("generates text", function () {
    let mm = new MarkovMachine("a b c");
    let text = mm.makeText();
    expect(mm.chains).toEqual({
      a: ["b"],
      b: ["c"],
      c: [null],
    });
    expect(["a b c", "b c", "c"]).toContain(text);
  });

  test("generates valid sentence", function () {
    let mm = new MarkovMachine("a b c");
    let text = mm.makeText();
    expect(text.endsWith("c")).toBe(true);
  });
});
