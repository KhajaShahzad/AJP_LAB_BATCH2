const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

//create
router.post("/students", async (req, res) =>{
    const student = new Student(req.body);
    await student.save();
    res.send(student);
});

//read
router.get("/student", async (req, res) =>{
    const student = await Student.find();
    res.send(students);
});

module.exports = router;