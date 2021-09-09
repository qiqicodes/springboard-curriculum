describe("pivotIndex", function() {
  it("should return a pivot index if it exists", function() {
    expect(pivotIndex([1, 2, 1, 6, 3, 1])).toBe(3); // 3
  });

  it("should return -1 if no pivot index exists", function() {
    expect(pivotIndex([5, 2, 7])).toBe(-1);
  });

  it("should return the smallest pivot index", function() {
    expect(pivotIndex([-1, 3, -3, 2])).toBe(1); // 1
  });
});
