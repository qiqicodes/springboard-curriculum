describe("countPairs", function() {
  it("should return 0 if there are no pairs", function() {
    expect(countPairs([1, 2, 3, 4, 5], 10)).toBe(0);
    expect(countPairs([1, 2, 3, 4, 5], -3)).toBe(0);
  });

  it("should return 1 if there is one pair", function() {
    expect(countPairs([4, 6, 2, 7], 10)).toBe(1);
    expect(countPairs([0, -4], -4)).toBe(1);
  });

  it("should return the total number of pairs that sum to the target", function() {
    expect(countPairs([3, 1, 5, 4, 2], 6)).toBe(2);
    expect(countPairs([1, 2, 3, 0, -1, -2], 0)).toBe(2);
    expect(countPairs([10, 4, 8, 2, 6, 0], 10)).toBe(3);
  });
});
