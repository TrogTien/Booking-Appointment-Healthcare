const express = require('express')
const router = express.Router()

const appointmentsController = require('../app/controllers/appointments.controller')

router.get('/:appointmentId', appointmentsController.readAppointment)
router.patch('/:appointmentId', appointmentsController.updateAppointment)
router.delete('/:appointmentId', appointmentsController.deleteAppointment)

router.get('/', appointmentsController.readAllAppointment)
router.post('/', appointmentsController.createAppointment)


module.exports = router
