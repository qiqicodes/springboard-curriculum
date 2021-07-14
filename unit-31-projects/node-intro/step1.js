const fs = require("fs");
const process = require("process");

function cat(path) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      process.stderr.write(`Error reading ${path}: ${err}`);
      // console.log(`Error reading ${path}: ${err}`);
      process.exit(1);
    } else {
      process.stdout.write(data);
      // console.log(data);
    }
  });
}

// read file successfully
// cat(process.argv[1]);

// inexistent path
// cat(
//   "/Users/qiqizheng/SpringBoardSEC/springboard-curriculum/unit-31-projects/node-intro/step4.js"
// );

// cli
cat(process.argv[2]);
