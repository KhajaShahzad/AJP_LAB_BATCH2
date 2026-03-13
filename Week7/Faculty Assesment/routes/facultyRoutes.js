const express = require("express");
const router = express.Router();
const Faculty = require("../models/Faculty");

// Create Faculty
router.post("/faculties", async (req, res) => {
    const faculty = new Faculty(req.body);
    await faculty.save();
    res.send(faculty);
});

// Read Faculties
router.get("/faculties", async (req, res) => {
    const faculties = await Faculty.find();
    res.send(faculties);
});

module.exports = router;