const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { User, validate } = require("../models/users");
const auth = require("../middlewares/auth");
const _ = require("lodash");

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.send(_.pick(user,['name','email']));
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("This email has already taken!");
  user = new User({ ...req.body });
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
  const token = user.generateToken();
  res.header("x-auth-token", token).send(user);
});

module.exports = router;
