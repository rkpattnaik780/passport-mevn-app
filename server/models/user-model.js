const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  name: String,
  githubId: String,
  image: String
});

const User = mongoose.model("user", userSchema);

module.exports = User;
