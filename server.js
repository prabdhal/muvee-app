const { urlencoded } = require('body-parser');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.redirect('/home');
});

app.use('/home', (req, res) => {
  res.render('index');
});

app.listen(port, () => console.log(`Listening to port ${3000}...`));
