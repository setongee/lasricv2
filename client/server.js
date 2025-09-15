const express = require('express');
const path = require('path');
const cors = require("cors")
const nodemailer = require("nodemailer");
require('dotenv').config()

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded ( {extended : true} ) )

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(9000, () => {
  console.log("app running on port 9000");
});