const Joi = require("joi");
const mongoose = require("mongoose");
const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: {
      type: String,
      minlength: 3,
      maxlength: 255,
      required: true
    }
  })
);

function validateCourse(data) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };

  return Joi.validate(data, schema);
}
module.exports.Course = Course;
module.exports.validate = validateCourse;
