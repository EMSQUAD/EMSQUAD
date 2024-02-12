const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const users = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password2' },
];

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find((u) => u.username === username && u.password === password);

  if (user) {
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid username or password' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
