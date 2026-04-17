const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const User = require('./models/User');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: true
}));

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/loginDB')
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/register.html'));
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    const existing = await User.findOne({ username });

    if (existing) {
        return res.send("User already exists");
    }

    await User.create({ username, password });

    res.send("User registered successfully. Go to login.");
});
// 👉 TEMP: create user (run once)
async function createUser() {
    const existing = await User.findOne({ username: "admin" });

    if (!existing) {
        await User.create({
            username: "admin",
            password: "1234"
        });
        console.log("Test user created");
    }
}
// createUser();



// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/login.html'));
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username, password });

    if (user) {
        req.session.user = user;
        res.redirect('/dashboard');
    } else {
        res.send("Invalid credentials");
    }
});

app.get('/dashboard', (req, res) => {
    if (req.session.user) {
        res.send(`
        <html>
        <head>
            <style>
                body {
                    font-family: Arial;
                    background: #f4f6f8;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                }

                .box {
                    background: white;
                    padding: 30px;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0,0,0,0.1);
                    text-align: center;
                }

                a {
                    display: inline-block;
                    margin-top: 15px;
                    padding: 10px 20px;
                    background: red;
                    color: white;
                    text-decoration: none;
                    border-radius: 5px;
                }

                a:hover {
                    background: darkred;
                }
            </style>
        </head>
        <body>
            <div class="box">
                <h2>Welcome ${req.session.user.username} 🎉</h2>
                <p>You are successfully logged in.</p>
                <a href="/logout">Logout</a>
            </div>
        </body>
        </html>
        `);
    } else {
        res.redirect('/');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});


// Start server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});