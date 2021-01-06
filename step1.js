const fs = require("fs");
const process = require("process");

//It should take one argument, path, and it should read the file with that path, and print the contents of that file.

const cat = (path) => {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      process.exit(1);
    } else {
      console.log(data);
    }
  });
};

cat(process.argv[2]);
