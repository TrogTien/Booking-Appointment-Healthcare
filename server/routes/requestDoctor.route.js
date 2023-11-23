const express = require('express')
const router = express.Router()

const appointmentsController = require('../app/controllers/requestDoctor.controller')

const authMiddleware = require('../app/middleware/auth.middleware')


router.get('/:requestDoctorId', appointmentsController.readRequestDoctor)
router.delete('/:requestDoctorId', appointmentsController.deleteRequestDoctor)

router.get('/', appointmentsController.readAllRequestDoctor)
router.post('/', appointmentsController.createRequestDoctor)


module.exports = router
