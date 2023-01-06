// imports
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

// create express app
const app = express();

const PORT = 4000;

// middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  // fs module
  /* const dir_name = path.join(__dirname, "shraboni");
  const is_dir = fs.existsSync(dir_name);
  console.log("====>", is_dir);
  if (!is_dir) {
    fs.mkdirSync(dir_name, (err) => {
      console.log(err);
    });
  }
  fs.writeFileSync(path.join(dir_name, "shraboni.txt"), "Hello shraboni."); */

  // crypto
  /* const data = "secret";
  const output = crypto.createHmac("sha256", data).digest("hex");
  console.log(output); */

  res.json({
    message: "successfully send Data",
    data: {
      name: "shraboni",
      company: "brainium information",
    },
  });
});

app.post("/filter", (req, res) => {
  if (!req.body.data) {
    res.status(400).json({ message: "Invalid data." });
  }
  if (typeof req.body.data !== "string") {
    res.status(400).json({ message: "Only string accepted" });
  }
  const strArr = req.body.data.split("");
  const output = strArr.reduce(
    (acc, cur) => {
      if (!isNaN(+cur)) {
        return { ...acc, number: acc.number + 1 };
      } else if (/[-_~!@#$%^&*()+]/gim.test(cur)) {
        return { ...acc, spacial_char: acc.spacial_char + 1 };
      } else {
        return { ...acc, alphabet: acc.alphabet + 1 };
      }
    },
    { alphabet: 0, number: 0, spacial_char: 0 }
  );

  res.status(200).json({
    message: "Successfully filtered data.",
    data: output,
  });
});

app.put("/update", (req, res) => {
  res.status(200).json({ message: "update response." });
});

// create server
app.listen(PORT, () => {
  console.log(`Running on port: ${PORT}`);
});
