// 1. Make a request to the Numbers API
// (http://numbersapi.com/) to get a fact about your favorite number.

// (Make sure you get back JSON by including the json query key, specific to this API. Details.

// 2. Figure out how to get data on multiple numbers in a single request.
// Make that request and when you get the data back, put all of the number facts on the page.

// 3. Use the API to get 4 facts on your favorite number.
// Once you have them all, put them on the page. It’s okay if some of the facts are repeats.

// (Note: You’ll need to make multiple requests for this.)

let baseURL = "http://numbersapi.com";
let favNum = 7;

// via axios
async function getFavNumFact() {
  let response = await axios.get(`${baseURL}/${favNum}?json`);
  console.log(response.data);
}

getFavNumFact();

// multiple number in single request via axios
let favNums = [1, 2, 7];

async function getFavNumsFacts() {
  let response = await axios.get(`${baseURL}/${favNums}?json`);
  console.log(response.data);
}

getFavNumsFacts();

// promise for all

async function getFourFacts() {
  let favNumFacts = [];
  for (let i = 1; i < 5; i++) {
    favNumFacts.push(axios.get(`${baseURL}/${favNum}?json`));
  }
  let facts = await Promise.all(favNumFacts);
  facts.forEach((response) => {
    //   console.log(response.data);
    $("body").append(`<p>${response.data.text}</p>`);
  });
}

getFourFacts();
