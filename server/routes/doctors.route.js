const express = require('express');
const router = express.Router();

const doctorsController = require('../app/controllers/doctors.controller');

const authMiddleware = require('../app/middleware/auth.middleware')

router.patch('/addHour/:doctorId', doctorsController.addHourDoctor);
router.get('/by-user/:userId', doctorsController.readDoctorByUserId);
router.get('/medical', doctorsController.readDoctorsMedical);

router.get('/:doctorId', doctorsController.readDoctor);
router.patch('/:doctorId', doctorsController.updateDoctor);
router.delete('/:doctorId', doctorsController.deleteDoctor);

router.get('/', doctorsController.readAllDoctor);
router.post('/', doctorsController.createDoctor);


module.exports = router;
