const { Doctor } = require('../models/Doctor.model');

class DoctorsController {

    // [GET] /api/doctors
    readAllDoctor(req, res) {
        Doctor.find()
            .then(docs => {
                res.send(docs);
            })
            .catch(err => {
                res.send(err);
            })
    }

    // [GET] /api/doctors/:doctorId
    readDoctor(req, res) {
        Doctor.findOne({
            _id: req.params.doctorId
        }).then(doc => {
            res.send(doc)
        }).catch(err => {
            res.status(404).send(err)
        })
    }
    

    // [POST] /api/doctors
    createDoctor(req, res) {
        const doctor = new Doctor( req.body );
        doctor.save()
            .then(doc => {
                res.send(doc);
            })
            .catch(err => {
                console.log(err)
            })
    }

    // [PATCH] /api/doctors/:doctorId
    updateDoctor(req, res) {
        Doctor.findOneAndUpdate({
            _id: req.params.doctorId
        }, { $set: req.body })
            .then(() => {
                res.send({ message: "Updated Doctor successfully"})
            })
    }

    // [DELETE] /api/doctors/:doctorId
    deleteDoctor(req, res) {
        Doctor.findOneAndRemove({
            _id: req.params.doctorId
        })
            .then(removedDoc => {
                res.send(removedDoc)
            }) 
    }

    

}

module.exports = new DoctorsController();
