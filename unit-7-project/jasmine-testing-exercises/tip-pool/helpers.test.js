describe("Helpers test (with setup and tear-down)", function () {
  beforeEach(function () {
    // initialization logic
    billAmtInput.value = 50;
    tipAmtInput.value = 10;
    submitPaymentInfo();
  });

  it("should sum total bill amount of all payments on sumPaymentTotal(billAmt)", function () {
    expect(sumPaymentTotal("billAmt")).toEqual(50);

    billAmtInput.value = 50;
    tipAmtInput.value = 10;
    submitPaymentInfo();

    expect(sumPaymentTotal("billAmt")).toEqual(100);
  });

  it("should sum total tip amount of all payments on sumPaymentTotal(tipAmt)", function () {
    expect(sumPaymentTotal("tipAmt")).toEqual(10);

    billAmtInput.value = 50;
    tipAmtInput.value = 10;
    submitPaymentInfo();

    expect(sumPaymentTotal("tipAmt")).toEqual(20);
  });

  it("should sum the total tip percentage of all payments on sumPaymentTotal(tipPercent)", function () {
    expect(sumPaymentTotal("tipPercent")).toEqual(20);

    billAmtInput.value = 50;
    tipAmtInput.value = 10;
    submitPaymentInfo();

    expect(sumPaymentTotal("tipPercent")).toEqual(40);
  });

  it('should round tip percent on calculateTipPercent()', function () {
    expect(calculateTipPercent(200, 50)).toEqual(25);
    expect(calculateTipPercent(78, 26)).toEqual(33);
  });

  it('should generate new td from value and append to tr on appendTd(tr, value)', function () {
    let newTr = document.createElement('tr');

    appendTd(newTr, 'test');

    expect(newTr.children.length).toEqual(1);
    expect(newTr.firstChild.innerHTML).toEqual('test');
  });

  afterEach(function () {
    billAmtInput.value = "";
    tipAmtInput.value = "";
    paymentTbody.innerHTML = "";
    summaryTds[0].innerHTML = "";
    summaryTds[1].innerHTML = "";
    summaryTds[2].innerHTML = "";
    serverTbody.innerHTML = "";
    paymentId = 0;
    allPayments = {};
  });
});
