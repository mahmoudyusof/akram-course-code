const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");
require("mongoose-type-email");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: mongoose.SchemaTypes.Email, required: true, unique: true },
  password: { type: String },
});

userSchema.methods.generateToken = function() {
  const token = jwt.sign({ _id: this._id, role:this.role }, "PrivateKey");
  return token;
};

const User = mongoose.model("User", userSchema);

function userValidation(data) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required(),
    email: Joi.string()
      .email()
      .min(3)
      .required(),
    password: Joi.string()
      .required()
      .min(8)
  };
  return Joi.validate(data, schema);
}

module.exports.User = User;
module.exports.validate = userValidation;
