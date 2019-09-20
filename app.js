const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const path = require("path");
const OCR = require("./src/ocr");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

 app.use("/api/ocr", OCR);

module.exports = app;
