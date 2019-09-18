const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const path = require("path");
const OCR = require("./src/ocr");

global._srcImage = `${__dirname}/upload`

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

 app.use("/api/ocr", OCR);
// app.use('/api/ocr', express.static(path.join(__dirname, '/upload')));
module.exports = app;
