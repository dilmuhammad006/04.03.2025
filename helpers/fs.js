const fs = require("node:fs");

const readFile = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return data.length ? JSON.parse(data) : [];
  } catch (error) {
    console.log(error.message);
  }
};

const wrtieFile = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 4), "utf-8");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { readFile, wrtieFile };