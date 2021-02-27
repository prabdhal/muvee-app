const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');

app.listen(port, `Listening to port ${port}...`);
