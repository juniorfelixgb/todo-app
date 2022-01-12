const fs = require("fs");

const file = "./db/data.json";

const saveDb = (data) => {
  fs.writeFileSync(file, JSON.stringify(data));
};

const readDb = () => {
  if (!fs.existsSync(file)) {
    return null;
  }
  const info = fs.readFileSync(file, { encoding: "utf8" });
  return (info) ? JSON.parse(info) : null;
};

module.exports = {
  saveDb,
  readDb,
};
