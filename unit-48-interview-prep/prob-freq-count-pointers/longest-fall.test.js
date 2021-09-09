describe("longestFall", function() {
  it("should return 0 for an empty array", function() {
    expect(longestFall([])).toBe(0);
  });

  it("should return 1 for an array of length 1", function() {
    expect(longestFall([2])).toBe(1);
  });

  it("should return 1 if the array values never decrease", function() {
    expect(longestFall([1, 2, 3, 4, 5])).toBe(1);
  });

  it("should not treat ties as decreasing", function() {
    expect(longestFall([5, 4, 4, 4, 3, 2])).toBe(3);
    expect(longestFall([2, 2, 1])).toBe(2);
  });
  
  it("should return  the longest consecutive streak of decreasing integers", function() {
    expect(longestFall([5, 3, 1, 3, 0])).toBe(3);
    expect(longestFall([9, 8, 7, 6, 5, 6, 4, 2, 1])).toBe(5);
  });
});
