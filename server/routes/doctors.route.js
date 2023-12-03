const express = require('express');
const router = express.Router();

const multer = require('multer');

const doctorsController = require('../app/controllers/doctors.controller');

const authMiddleware = require('../app/middleware/auth.middleware');

// Upload image
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
})

const upload = multer({ storage: storage });




router.patch('/deleteHour/:doctorId', doctorsController.removeHourDoctor);
router.patch('/addHour/:doctorId', doctorsController.addHourDoctor);

router.get('/by-user/:userId', doctorsController.readDoctorByUserId);
router.get('/medical/:medicalId', doctorsController.readDoctorsMedical);

router.post('/upload/', upload.single("image"), doctorsController.uploadImage);

router.get('/:doctorId', doctorsController.readDoctor);
router.patch('/:doctorId', doctorsController.updateDoctor);
router.delete('/:doctorId', doctorsController.deleteDoctor);

router.get('/', doctorsController.readAllDoctor);
router.post('/', doctorsController.createDoctor);


module.exports = router;
