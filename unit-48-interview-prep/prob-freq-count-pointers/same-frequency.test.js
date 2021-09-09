describe("sameFrequency", function() {
  it("should return true if the frequencies are the same", function() {
    expect(sameFrequency(182, 281)).toBe(true);
    expect(sameFrequency(3589578, 5879385)).toBe(true);
  });

  it("should return false if the frequencies are not the same", function() {
    expect(sameFrequency(34, 14)).toBe(false);
    expect(sameFrequency(22, 222)).toBe(false);
  });
});
