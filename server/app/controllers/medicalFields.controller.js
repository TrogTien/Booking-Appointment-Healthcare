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
    createMedicalField = async (req, res) => {
        try {
            const { name, description } = req.body;
            const imagePath = 'uploads/' + req.file.filename;

            const newMedical = new MedicalField({
                name,
                description,
                image: imagePath
            })

            newMedical.save()
                .then(() => {
                    res.status(200).send(newMedical);

                })
                .catch(err => {
                    console.log(err);
                    if (err.code === 11000) {
                        res.status(500).json("Tên chuyên khoa đã tồn tại")
                    } else {
                        res.status(500).send(err)
                    }
                })

        }
        catch (err) {
            res.send(err)
        }

    }

    // createMedicalField(req, res) {
    //     const medicalField = new MedicalField( req.body );
    //     medicalField.save()
    //         .then(doc => {
    //             res.send(doc);
    //         })
    //         .catch(err => {
    //             res.send(err)
    //         })
    // }

    // [PATCH] /api/medical_fields/:medicalFieldId
    updateMedicalField = async (req, res) => {
        try {
            const { name, description } = req.body;

            const updateFields = {
                name,
                description
            };

            if (req.file) {
                const imagePath = 'uploads/' + req.file.filename;
                updateFields.image = imagePath;
            }

            const updateMedical = await MedicalField.findOneAndUpdate(
                { _id: req.params.medicalFieldId},
                updateFields,
                { new: true }
            )

            if (!updateFields) {
                return res.status(404).json("Medical not found");
            }

            res.status(200).json(updateMedical)

        }
        catch (err) {
            res.status(500).send(err)
        }
    
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

    // [POST] /api/medical_fields/upload
    uploadImage = async (req, res) => {
        if (!req.file) {
            return res.status(400).send("No file.");
        }

        const imagePath = 'uploads/' + req.file.filename;

        try {
            const medicalId = req.body.medicalId;
            const medical = await MedicalField.findByIdAndUpdate(
                medicalId,
                { image: imagePath},
                { new: true}
            )

            if (!medical) {
                return res.status(404).send("Medical not found");
            }

            res.status(200).json("Image uploaded and medical field updated");
        }
        catch (err) {
            res.status(500).send(err);
        }
    }


    

}

module.exports = new MedicalFieldsController();
