const dotenv = require("dotenv");
dotenv.config({ path: "./phowithyou/.env" });
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
    let isAdmin = false;
    if (!isMatch) {
      return res.status(400).send({ msg: "Incorrect password" });
    }
    const token = jwt.sign({ id: user._id }, "passwordKey");
    if (user.email === "admin") {
      isAdmin = true;
    }

    res.status(201).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        isAdmin: isAdmin,
        image: user.image,
      },
    });
    console.log("Succesfully logged in");
  } catch (err) {
    console.log(err);
  }
});
app.put("/users/:id", verifyToken, async (req, res) => {
  console.log(req.body);
  const userId = req.params.id;
  const { name, personality, image } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { name: name, description: personality, image: image }
    );
    console.log("Updated user successfully.");
    console.log(image);
    res.status(200).json({ user });
  } catch (err) {
    console.log("cannot find user");
  }
});

function verifyToken(req, res, next) {
  const auth = req.headers["authorization"];
  const token = auth && auth.split(" ")[1];
  if (!token) {
    console.log("no token found");
  } else {
    jwt.verify(token, "passwordKey", (err, decoded) => {
      if (err) {
        console.log(err);
      } else {
        req.id = decoded.id;
        next();
      }
    });
  }
}
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
    console.log(users);
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
  image: String,
});

const User = mongoose.model("User", userSchema);
// const user = new User({
//   name: "Test",
//   username: "lekhoapro",
//   password: "123",
// });
// user.save().then(() => console.log("Successfully saved to db"));
