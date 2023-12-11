const express = require('express')
const router = express.Router()

const appointmentsController = require('../app/controllers/appointments.controller')

const authMiddleware = require('../app/middleware/auth.middleware')


router.get('/countDocument', appointmentsController.countDocument)

router.get('/checkIsConfirmed-time', appointmentsController.checkIsConfirmed)

router.get('/:appointmentId', authMiddleware.authenticate, appointmentsController.readAppointment)
router.patch('/:appointmentId', appointmentsController.updateAppointment)
router.delete('/:appointmentId', authMiddleware.authenticate, appointmentsController.deleteAppointment)

router.get('/', authMiddleware.authenticate, appointmentsController.readAllAppointment)
router.post('/', authMiddleware.authenticate, appointmentsController.createAppointment)


module.exports = router
