const dotenv = require("dotenv");
dotenv.config();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 8000;
const mongoose = require("mongoose");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Starting server at port ${PORT}`);
    });
  });

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcryptjs.hash(password, 8);
  const newUser = new User({ email: email, password: hashedPassword });
  await newUser.save();
  console.log(`New user with email: ${email} has been added to db`);
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ msg: "Incorrect password" });
    }
    const token = jwt.sign({ id: user._id }, "passwordKey");
    res.status(201).json({ token, user: { id: user._id, email: user.email } });
    console.log("Succesfully logged in");
  } catch (err) {
    console.log(err);
  }
});
app.put("users/:id", async (req, res) => {
  const userId = req.params.id;
  const { name, personality } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { name: name },
      { description: personality }
    );
    console.log("Updated user successfully.");
  } catch (err) {
    console.log(err);
  }
});
// Structure of the user in the database
const userSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String,
    unique: true,
    trim: true,
  },
  password: {
    required: true,
    type: String,
  },
  name: String,
  description: String,
});

const User = mongoose.model("User", userSchema);
// const user = new User({
//   name: "Test",
//   username: "lekhoapro",
//   password: "123",
// });
// user.save().then(() => console.log("Successfully saved to db"));
