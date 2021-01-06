const fs = require("fs");
const process = require("process");
const axios = require("axios");

//Add a new function, webCat. This should take a URL and, using axios, should read the content of that URL and print it to the console.
//Modify the code that invoked cat so that, based on the command-line args, it decides whether the argument is a file path or a URL and calls either cat or webCat, respectively.

const cat = (path) => {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
};

const webCat = async (url) => {
  try {
    let res = await axios.get(url);
    console.log(res.data);
  } catch (err) {
    console.log(`Error fetching ${url}`, err);
    process.exit(1);
  }
};

let path = process.argv[2];

if (path.slice(0, 4) === "http") {
  webCat(path);
} else {
  cat(path);
}
