const express = require('express');
const router = express.Router();

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
})

const upload = multer({ storage: storage });



router.post('/', upload.single("image"), (req, res, next) => {
    console.log(req.file.filename);
    if (!req.file.filename) {
        return res.status(500).json("Please upload image")
    }

    return res.status(200).json("Image uploaded Successfully")

})



module.exports = router;