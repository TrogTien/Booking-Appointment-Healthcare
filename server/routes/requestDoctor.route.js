const express = require('express')
const router = express.Router()

const appointmentsController = require('../app/controllers/requestDoctor.controller')

const authMiddleware = require('../app/middleware/auth.middleware')


router.get('/:requestDoctorId', authMiddleware.authenticate, appointmentsController.readRequestDoctor)
router.delete('/:requestDoctorId', authMiddleware.authenticate, appointmentsController.deleteRequestDoctor)

router.get('/', authMiddleware.authenticate, appointmentsController.readAllRequestDoctor)
router.post('/', authMiddleware.authenticate, appointmentsController.createRequestDoctor)


module.exports = router
