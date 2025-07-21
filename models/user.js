const mongoose = require("mongoose");
const validator = require("validator");

const { Schema, models, model } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: "provide correct email address",
      },
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = models.User || model("User", userSchema);

module.exports = User;
