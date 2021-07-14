const fs = require("fs");
const process = require("process");
const axios = require("axios");

function cat(path) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.log(`Error reading ${path}: ${err}`);
      process.exit(1);
    } else {
      console.log(data);
    }
  });
}

async function webCat(url) {
  try {
    let response = await axios.get(url);
    console.log(response.data);
  } catch (err) {
    console.error(`Error reading ${url}: ${err}`);
    process.exit(1);
  }
}

let path = process.argv[2];

// existent url
// let path = "http://www.google.com";

// inexistent url
// let path = "http://rithmschool.com/no-such-path";

// existent path to file
// let path =
// "/Users/qiqizheng/SpringBoardSEC/springboard-curriculum/unit-31-projects/node-intro/step1.js";

// inexistent path to file
// let path =
//   "/Users/qiqizheng/SpringBoardSEC/springboard-curriculum/unit-31-projects/node-intro/step4.js";

if (path.slice(0, 4) === "http") {
  webCat(path);
} else {
  cat(path);
}
