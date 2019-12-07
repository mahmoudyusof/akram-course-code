const mongoose = require("mongoose");
const express = require("express");
const app = express();
const courses = require("./routes/courses");
const users = require("./routes/users");
const auth = require("./routes/auth");
// const authorized = require('./middlewares/auth')

mongoose
  .connect("mongodb://localhost/session4", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to database..."))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("hello");
});

app.use(express.json());
app.use("/api/courses", courses);
app.use("/api/users", users);
app.use("/api/auth", auth);

app.listen(3000, () => console.log("listening to port 3000"));
