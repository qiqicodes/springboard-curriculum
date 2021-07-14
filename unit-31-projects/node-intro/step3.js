const fs = require("fs");
const process = require("process");
const axios = require("axios");

function handleOutput(data, outputPath) {
  if (outputPath) {
    fs.writeFile(outputPath, data, (err) => {
      if (err) {
        console.error(`Error writing ${outputPath}: ${err}`);
        process.exit(1);
      } else {
        console.log(data);
      }
    });
  }
}

function cat(path, outputPath) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.log(`Error reading ${path}: ${err}`);
      process.exit(1);
    } else {
      handleOutput(data, outputPath);
    }
  });
}

async function webCat(url, outputPath) {
  try {
    let response = await axios.get(url);
    handleOutput(response.data, outputPath);
  } catch (err) {
    console.error(`Error reading ${url}: ${err}`);
    process.exit(1);
  }
}

let path, outputPath;

if (process.argv[2] === "--out") {
  outputPath = process.argv[3];
  path = process.argv[4];
} else {
  path = process.argv[2];
}

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
  webCat(path, outputPath);
} else {
  cat(path, outputPath);
}
