const { MedicalField } = require('../models/MedicalField.model');

class MedicalFieldsController {

    // [GET] /api/medical_fields
    readAllMedicalField(req, res) {
        MedicalField.find()
            .then(docs => {
                res.send(docs);
            })
            .catch(err => {
                res.send(err);
            })
    }

    // [GET] /api/medical_fields/:medicalFieldId
    readMedicalField(req, res) {
        MedicalField.findOne({
            _id: req.params.medicalFieldId
        }).then(doc => {
            res.send(doc)
        }).catch(err => {
            res.status(404).send(err)
        })
    }
    

    // [POST] /api/medical_fields
    createMedicalField(req, res) {
        const medicalField = new MedicalField( req.body );
        medicalField.save()
            .then(doc => {
                res.send(doc);
            })
            .catch(err => {
                res.send(err)
            })
    }

    // [PATCH] /api/medical_fields/:medicalFieldId
    updateMedicalField(req, res) {
        MedicalField.findOneAndUpdate({
            _id: req.params.medicalFieldId
        }, { $set: req.body })
            .then(() => {
                res.send({ message: "Updated Medical Field successfully"})
            })
    }

    // [DELETE] /api/medical_fields/:medicalFieldId
    deleteMedicalField(req, res) {
        MedicalField.findOneAndRemove({
            _id: req.params.medicalFieldId
        })
            .then(removedDoc => {
                res.send(removedDoc)
            }) 
    }

    

}

module.exports = new MedicalFieldsController();
