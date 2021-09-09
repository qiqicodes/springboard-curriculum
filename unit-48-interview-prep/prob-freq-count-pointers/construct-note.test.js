describe("constructNote", function() {
  it("should return false for empty letters string", function() {
    expect(constructNote("abcd", "")).toBe(false);
  });

  it("should return true for empty message", function() {
    expect(constructNote("", "abc")).toBe(true);
  });

  it("should account for duplicates", function() {
    expect(constructNote("aa", "abcd")).toBe(false);
  });

  it("should handle large cases", function() {
    expect(
      constructNote("skbjjjvnnd", "fdjlkjfeburevjvnfnsjckjncjdnchbechbadhsd")
    ).toBe(true);
  });

  it("should return true if all letters contained", function() {
    expect(constructNote("abc", "abcd")).toBe(true);
  });
});
