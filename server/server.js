const dotenv = require("dotenv");
dotenv.config({ path: "./phowithyou/.env" });
const express = require("express"); // expressJS
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
    app.post("/signup", (req, res) => {
      res.status(400).json({ msg: "Error testing" });
    });
  });

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
// const User = mongoose.model("User", userSchema);
// const user = new User({
//   name: "Test",
//   username: "lekhoapro",
//   password: "123",
// });
// user.save().then(() => console.log("Successfully saved to db"));
