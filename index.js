const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
app.use(express.json());

mongoose.connect(
  "mongodb://Mays:maysmlab1@ds363118.mlab.com:63118/atm-db",
  { useNewUrlParser: true },
  function (error) {
    if (error) {
      console.log(error);
    } else {
      console.log("connected to the database");
    }
  }
);

const loginSchema = new mongoose.Schema({
  name: String,
  password: String,
});

const user3Collection = mongoose.model("user3Collection", loginSchema);

app.post("/newUser", async function (req, res) {
  try {
    //let y = req.body.password; det undifiend
    let y = "123"; //it works
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(y, salt);
    let newUser = new user3Collection({
      name: req.body.name,
      password: hash,
    });

    await newUser.save();
    res.send(newUser);
    console.log(newUser);
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000, () => {
  console.log("Server Started!");
});
