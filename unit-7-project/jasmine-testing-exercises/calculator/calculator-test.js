
it('should calculate the monthly rate correctly', function () {
  // ...
  const values = {
    amount: 150000,
    years: 20,
    rate: 2.34
  };
  expect(calculateMonthlyPayment(values)).toEqual('783.21');
});


it("should return a result with 2 decimal places", function() {
  // ..
  const values = {
    amount: 1234,
    years: 7,
    rate: 4.8
  };
  expect(calculateMonthlyPayment(values)).toEqual('17.33')
});

it("should take high interest", function () {
  const values = {
    amount: 3948,
    years: 9,
    rate: 124
  };
  expect(calculateMonthlyPayment(values)).toEqual('407.97');
});
  
