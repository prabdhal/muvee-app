require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
//const mongoose = require('mongoose');

// Database Connection
// mongoose.connect(process.env.MONGO_URI, {
//   useCreateIndex: true,
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
// });

// Middleware
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

// Routes
app.get('/', (req, res) => {
  res.redirect('/home');
});

app.get('/home', (req, res) => {
  res.render('index', { title: 'Home' });
});

// Listen
app.listen(port, console.log(`Listening to port ${port}...`));
