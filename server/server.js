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
  const isExist = await User.findOne({ email });
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  if (isExist) {
    return res
      .status(400)
      .json({ msg: "The user with this email is already existed" });
  }
  if (password.length < 6) {
    return res
      .status(400)
      .json({ msg: "The password should have at least 6 characters" });
  }
  const hashedPassword = await bcryptjs.hash(password, 8);
  const newUser = new User({ email: email, password: hashedPassword });
  await newUser.save();
  console.log(`New user with email: ${email} has been added to db`);
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ msg: "Please enter all field" });
    }
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
  const userId = req.params.id;
  const { name, personality, image } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { name: name, description: personality, image: image }
    );
    console.log("Updated user successfully.");
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
    return res.json(users);
  } catch (err) {
    console.log(err);
  }
});

app.delete("/users/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const isDeleted = await User.findByIdAndDelete(userId);
    if (!isDeleted) {
      return res.status(400).json({ msg: "User Not Found" });
    } else {
      return res.status(200).json({ msg: "success" });
    }
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
