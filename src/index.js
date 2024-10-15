const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
let users = [];
let nextId = 1;

// POST /users: Create a new user
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ message: "Name and email are required" });
    }

    const newUser = { id: nextId++, name, email };
    users.push(newUser);

    res.status(201).json(newUser);
});

// GET /users/:id: Retrieve user information by id
app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find(u => u.id === parseInt(id));

    if (!user) {
        return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(user);
});

// PUT /users/:id: Update user information by id
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const user = users.find(u => u.id === parseInt(id));

    if (!user) {
        return res.status(404).json({ message: "User not found." });
    }

    if (!name || !email) {
        return res.status(400).json({ message: "Name and email are required." });
    }

    user.name = name;
    user.email = email;

    res.json(user);
});

// DELETE /users/:id: Delete a user by id
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const userIndex = users.findIndex(u => u.id === parseInt(id));

    if (userIndex === -1) {
        return res.status(204).json({ message: "No content." });
    }

    users.splice(userIndex, 1);
    res.status(204).send();
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing