const { Appointment } = require('../models/Appointment.model');

class AppointmentsController {

    // [GET] /api/appointments
    readAllAppointment(req, res) {
        Appointment.find()
            .then(docs => {
                res.send(docs);
            })
            .catch(err => {
                res.send(err);
            })
    }

    // [GET] /api/appointments/:appointmentId
    readAppointment(req, res) {
        Appointment.findOne({
            _id: req.params.appointmentId
        }).then(doc => {
            res.send(doc)
        }).catch(err => {
            res.status(404).send(err)
        })
    }
    

    // [POST] /api/appointments
    createAppointment(req, res) {
        const appointment = new Appointment( req.body );
        appointment.save()
            .then(doc => {
                res.send(doc);
            })
            .catch(err => {
                res.send(err)
            })
    }

    // [PATCH] /api/appointments/:appointmentId
    updateAppointment(req, res) {
        Appointment.findOneAndUpdate({
            _id: req.params.appointmentId
        }, { $set: req.body })
            .then(() => {
                res.send({ message: "Updated Appointment successfully"})
            })
    }

    // [DELETE] /api/appointments/:appointmentId
    deleteAppointment(req, res) {
        Appointment.findOneAndRemove({
            _id: req.params.appointmentId
        })
            .then(removedDoc => {
                res.send(removedDoc)
            }) 
    }

    

}

module.exports = new AppointmentsController();
