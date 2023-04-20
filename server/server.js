const dotenv = require("dotenv");
dotenv.config({ path: "./phowithyou/.env" });
const express = require("express"); // expressJS
const app = express();
const PORT = 8000;
const mongoose = require("mongoose");

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

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
});
const User = mongoose.model("User", userSchema);
const newUser = User({ name: "Khoa Le", password: "password234" });
const user2 = User({ name: "Gage", password: "men" });
