const fs = require("fs");
const process = require("process");
const axios = require("axios");

//Add a feature where, on the command line, you can optionally provide an argument to output to a file instead of printing to the console. The argument should look like this: --out output-filename.txt readfile-or-url

const cat = (path, file) => {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      process.exit(1);
    } else {
      handleData(data, file);
    }
  });
};

const webCat = async (url, file) => {
  try {
    let res = await axios.get(url);
    handleData(res.data, file);
  } catch (err) {
    console.log(`Error fetching ${url}`, err);
    process.exit(1);
  }
};

function handleData(text, out) {
  if (out) {
    fs.writeFile(out, text, "utf8", function (err) {
      if (err) {
        console.error(`Couldn't write ${out}: ${err}`);
        process.exit(1);
      }
    });
  } else {
    console.log(text);
  }
}

let path;
let file;

process.argv[2] === "--out"
  ? ((path = process.argv[4]), (file = process.argv[3]))
  : (path = process.argv[2]);

if (path.slice(0, 4) === "http") {
  webCat(path, file);
} else {
  cat(path, file);
}
