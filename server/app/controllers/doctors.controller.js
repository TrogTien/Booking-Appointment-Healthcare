const { Doctor } = require('../models/Doctor.model');
const doctorJson = require('../../config/json/doctors.json')

class DoctorsController {

    // [GET] /api/doctors?search=Tien&page=3&limit=6
    readAllDoctor = async (req, res) => {
        try {
            const search = req.query.search || "";

            const doctors = await Doctor.find({ name: {$regex: search, $options: "i"}})
            

            

            res.status(200).json(doctors);

        } 
        catch (err) {
            console.log(err);
            res.status(500).json("Internal Server Error");
        }
    }

    readDoctorsMedical = async (req, res) => {
        try {
            const  medical  = req.query.medical;

            if (!medical) {
                return res.status(400).json({err: "Missing medicalSpecialty parameter"})
            }

            const doctors = await Doctor.find({ medicalSpecialty: { $in: medical } });

            res.status(200).json(doctors)
        }
        catch (err) {
            res.status(500).send(err)
        }
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
                res.send(err)
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

const insertMovies = async () => {
    try {
        const docs = await Doctor.insertMany(doctorJson);
        return Promise.resolve(docs);
    } catch (err) {
        return Promise.reject(err)
    }
};

insertMovies()
    .then((docs) => console.log(docs))
    .catch((err) => console.log(err))


module.exports = new DoctorsController();
