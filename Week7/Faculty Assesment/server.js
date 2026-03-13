const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const facultyRoutes = require("./routes/facultyRoutes");

const app = express();

app.use(bodyParser.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/facultyDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.use("/api", facultyRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});