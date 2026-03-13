const mongoose = require("mongoose");

const FacultySchema = new mongoose.Schema({
    name: String,
    age: Number,
    department: String,
    designation: String,
    salary: Number
});

module.exports = mongoose.model("Faculty", FacultySchema);