window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
    // set default values
    const values = { amount: 100000, years: 10, rate: 2.5};
    // get inputs from the DOM
    const amountUI = document.getElementById("loan-amount");
    amountUI.value = values.amount;
    const yearsUI = document.getElementById("loan-years");
    yearsUI.value = values.years;
    const rateUI = document.getElementById("loan-rate");
    rateUI.value = values.rate;
    // call a calculate function
    update();
  
}

// Get the current values from the UI
// Update the monthly payment
function update() {
    const currentUIValue = getCurrentUIValues();
    updateMonthly(calculateMonthlyPayment(currentUIValue));
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places. .toFixed(2)
function calculateMonthlyPayment(values) {
    const moRate = (values.rate/100) / 12;
    const n = Math.floor(values.years * 12);
    return (
      (values.amount * moRate) / (1 - Math.pow((1 + moRate), -n))
    ).toFixed(2);

}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
    // where to display the number
    const moPaymentUI = document.getElementById("monthly-payment");
    // what to do: change the innerHTML text of the 
    moPaymentUI.innerText = `$${monthly}`;
}
