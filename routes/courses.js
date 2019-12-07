const express = require('express')
const router = express.Router();
const {Course,validate} = require('../models/courses')
const auth = require('../middlewares/auth')

router.get("/", async (req, res) => {
    const data = await Course.find();
    if (!data.length) return res.status(404).send('No courses found');
    res.send(data);
});

router.get("/:id",auth, async (req, res) => {
    const data = await Course.findById(req.params.id);
    if (!data) return res.status(404).send('No courses found');
    res.send(data);
});

router.post("/", async (req, res) => {
    const {error} = validate(req.body)
    if (error)
        return res.status(400).send(result.error.details[0].message);

    // NOTE: ID is automatically generated so don't worry about it
    const course = new Course({ ...req.body });
    await course.save();
    res.send(`Course ${course.name} added successfully!`);
});

module.exports = router;