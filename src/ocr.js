let express = require('express');
let rotas = express.Router();
const multer = require('multer');
const fs = require("fs");
const { TesseractWorker } = require('tesseract.js');
const worker = new TesseractWorker();

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './upload');
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	}
});

const upload = multer({ storage: storage }).single("file");

rotas.post('/', (req, res) =>{
    upload(req, res, err => {
        fs.readFile(`./upload/${req.file.originalname}`, (err, data) => {
            if (err) return res.status(500).send("Ops... Error");

            worker
                .recognize(data, "eng", { tessjs_create_pdf: '1' })
                .progress(progress => console.log(progress))
                .then(result => res.send(result.text))
                .finally(() => worker.terminate());
        })
    });
});

module.exports = rotas;
