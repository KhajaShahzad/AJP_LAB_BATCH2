const express = require("express");
const app = express();

const PORT = 3000;

// Addition
app.get("/add/:a/:b", (req, res) => {
    const a = parseFloat(req.params.a);
    const b = parseFloat(req.params.b);
    res.send("Result: " + (a + b));
});

// Subtraction
app.get("/sub/:a/:b", (req, res) => {
    const a = parseFloat(req.params.a);
    const b = parseFloat(req.params.b);
    res.send("Result: " + (a - b));
});

// Multiplication
app.get("/mul/:a/:b", (req, res) => {
    const a = parseFloat(req.params.a);
    const b = parseFloat(req.params.b);
    res.send("Result: " + (a * b));
});

// Division
app.get("/div/:a/:b", (req, res) => {
    const a = parseFloat(req.params.a);
    const b = parseFloat(req.params.b);

    if (b === 0) {
        return res.send("Error: Cannot divide by zero");
    }

    res.send("Result: " + (a / b));
});

app.listen(PORT, () => {
    console.log("Server running on http://localhost:" + PORT);
});