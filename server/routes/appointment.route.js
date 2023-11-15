const express = require('express')
const router = express.Router()

const appointmentsController = require('../app/controllers/appointments.controller')
const authMiddleware = require('../app/middleware/auth.middleware')


router.get('/:appointmentId', appointmentsController.readAppointment)
router.patch('/:appointmentId', appointmentsController.updateAppointment)
router.delete('/:appointmentId', appointmentsController.deleteAppointment)

router.get('/', appointmentsController.readAllAppointment)
router.post('/', authMiddleware.authenticate, appointmentsController.createAppointment)


module.exports = router
