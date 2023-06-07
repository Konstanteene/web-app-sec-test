const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const db = new sqlite3.Database('database.db');
db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT)');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('app'));

app.post('/register', (req, res) => {
  const { name, email } = req.body;
  db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.send('Registration successful');
    }
  });
});

app.get('/users', (req, res) => {
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.json(rows);
    }
  });
});


// app.listen(5000, () => {
//   console.log('App listening on port 5000');
// });
if (process.env.NODE_ENV !== 'test') {
  app.listen(5000, () => {
    console.log('App listening on port 5000');
  });
}

module.exports = app;
// if (process.env.NODE_ENV === 'development') {
//   const server = app.listen(5000, () => {
//     console.log('App listening on port 5000');
//   });

//   module.exports = server;
// } else {
//   module.exports = app;
// }