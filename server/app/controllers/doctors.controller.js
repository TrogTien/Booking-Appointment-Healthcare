const { Doctor } = require('../models/Doctor.model');
const { User } = require('../models/User.model');
const { RequestDoctor } = require('../models/RequestDoctor.model');
const { MedicalField } = require('../models/MedicalField.model');

const { removeOldAvailableTimes } = require('../../util/autoRemoveTimes')


// const doctorJson = require('../../config/json/doctors.json')

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

    // [GET] /api/doctors/medical/:medicalId
    readDoctorsByMedicalId = async (req, res) => {
        try {
            const  medicalId  = req.params.medicalId;

            const medicalField = await MedicalField.findById(medicalId);

            if (!medicalField) {
                return res.status(404).json({err: "Medical field is not found"})
            }

            const doctors = await Doctor.find({ medicalSpecialty: medicalField.name });

            res.status(200).json(doctors)
        }
        catch (err) {
            res.status(500).send(err)
        }
    }

    // [GET] /api/doctors/:doctorId
    readDoctor = async (req, res) => {
        try {
            const doctor = await Doctor.findOne({ _id: req.params.doctorId});
            const newDoctor = await removeOldAvailableTimes(doctor);

            res.status(200).send(newDoctor);
        }
        catch (err) {
            res.status(404).send(err)
        }
       
    }

    // [GET] /api/doctors/by-user/:userId
    readDoctorByUserId(req, res) {
        Doctor.findOne({
            userId: req.params.userId
        }).then(doc => {
            res.send(doc)
        }).catch(err => {
            res.status(404).send(err)
        })
    }
    

    // [POST] /api/doctors
    createDoctor = async (req, res) => {
        try {
            const userId = req.body.userId;
            const doctor = new Doctor( req.body );
            await doctor.save();
            // đổi role user => doctor
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).send("User not found");
            }

            user.role = "doctor";
            await user.save();

            // xóa requestDoctor
            await RequestDoctor.deleteMany({ userId });


            res.status(200).json("Doctor has been created")

        }
        catch (err) {
            res.status(500).send(err);
        }
       
    }

    // [PATCH] /api/doctors/:doctorId
    updateDoctor(req, res) {
        Doctor.findOneAndUpdate({
            _id: req.params.doctorId
        }, { $set: req.body })
            .then(() => {
                res.send({ message: "Updated Doctor successfully"})
            })
            .catch(err => {
                res.status(500).send(err)
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

    // [PATCH] /api/doctors/addHour/:doctorId
    addHourDoctor = async (req, res) => {
        try {

            const doctorId = req.params.doctorId;
            const { day, hour } = req.body;

            const doctor = await Doctor.findById(doctorId);
            

            if (!doctor) {
                return res.status(404).json({ message: "Doctor not found"});
            }

            const existingDay = doctor.availableTimes.find(item => item.day.toISOString() == day);
            if (existingDay) {
                existingDay.hours.push(hour);
            } else {
                // Nếu không tồn tại ngày tạo đối tượng ngày giờ mới
                doctor.availableTimes.push({
                    day: new Date(day),
                    hours: [hour]
                })
            }

            await doctor.save();

            res.status(200).json({ message: "Hours added successfully"})

        }
        catch (err) {
            res.status(500).send(err);
        }
    }

    // [PATCH] /api/doctors/deleteHour/:doctorId
    removeHourDoctor = async (req, res) => {
        try {
            const doctorId = req.params.doctorId;
            const { day, hour } = req.body;

            const doctor = await Doctor.findById(doctorId);

            if (!doctor) {
                return res.status(404).json({ message: "Doctor not found"});
            }

            const availableTimeIndex = doctor.availableTimes.findIndex(item => item.day.toISOString() == day);
            if (availableTimeIndex === -1) {
                return res.status(404).json({ message: "Doctor's available time not found for the given day"});
            }

            const availableTime = doctor.availableTimes[availableTimeIndex];

            if (availableTime.hours.length === 1) {
                // Nễu chỉ có 1 hour thì xóa cả Object ngày giờ
                doctor.availableTimes.splice(availableTimeIndex, 1);

            } else if (availableTime.hours.length > 1) {
                // Chỉ xóa hour đó trong mảng hours
                const hourIndex = availableTime.hours.findIndex( item => item === hour);
                if (hourIndex !== -1) {
                    availableTime.hours.splice(hourIndex, 1);
                }

            }

            await doctor.save();
            res.status(200).json({ message: "Hours removed successfully"})
        }
        catch (err) {
            console.log("Err: ", err )
            res.status(500).send(err)
        }
    }

    // [POST] /api/doctors/upload
    uploadImage = async (req, res) => {
        if (!req.file) {
            return res.status(400).send("No file.");
        }

        const imagePath = 'uploads/' + req.file.filename;

        try {
            const doctorId = req.body.doctorId;
            const doctor = await Doctor.findByIdAndUpdate(
                doctorId,
                { image: imagePath},
                { new: true}
            )

            if (!doctor) {
                return res.status(404).send("Doctor not found");
            }

            res.status(200).json("Image uploaded and doctor updated");
        }
        catch (err) {
            res.status(500).send(err);
        }
    }

    
    

}



module.exports = new DoctorsController();
