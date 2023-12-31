const { Doctor } = require('../models/Doctor.model');
const { User } = require('../models/User.model');
const { RequestDoctor } = require('../models/RequestDoctor.model');
const { MedicalField } = require('../models/MedicalField.model');

const { removeOldAvailableTimes } = require('../../util/autoRemoveTimes')
const nodemailer = require('nodemailer');



// const doctorJson = require('../../config/json/doctors.json')

class DoctorsController {

    // [GET] /api/doctors/allDocuments  phan trang
    readAllDoctorDocuments = async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 8;
            const skip = (page - 1) * limit;

            const doctors = await Doctor.find().skip(skip).limit(limit);

            const total = await Doctor.countDocuments();

            const response = {
                doctors,
                total,
                limit,
                page
            }

            res.status(200).json(response);
        }
        catch (err) {   
            res.send(err);
        }
     
    }

    // [GET] /api/doctors?search=Tien&page=3&limit=6    phan trang
    readDoctors = async (req, res) => {
        try {

            const search = req.query.search || "";
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 8;
            const skip = (page - 1) * limit;

            const doctors = await Doctor.find({ 
                name: {$regex: search, $options: "i"},
                isActive: true
            })
                .skip(skip)
                .limit(limit);

            const total = await Doctor.countDocuments({ 
                name: { $regex: search, $options: "i" },
                isActive: true
            });

            const response = {
                total,
                page, 
                limit,
                doctors
            }

            res.status(200).json(response);

        } 
        catch (err) {
            console.log(err);
            res.status(500).json("Internal Server Error");
        }
    }

    // [GET] /api/doctors/medical/:medicalId    phan trang
    readDoctorsByMedicalId = async (req, res) => {
        try {
            const  medicalId  = req.params.medicalId;

            const medicalField = await MedicalField.findById(medicalId);

            if (!medicalField) {
                return res.status(404).json({err: "Medical field is not found"})
            }

            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 8;
            const skip = (page - 1) * limit;

            const doctors = await Doctor.find({ 
                medicalSpecialty: medicalField.name,
                isActive: true 
            })
                .skip(skip)
                .limit(limit)
            
            const total = await Doctor.countDocuments({
                medicalSpecialty: medicalField.name,
                isActive: true
            })

            const response = {
                total,
                page, 
                limit,
                doctors
            }

            res.status(200).json(response)
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

            // Gửi mail
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'trongtien372001@gmail.com',
                    pass: process.env.GMAIL_PASSWORD
                }
            })

            const options = {
                from: 'trongtien372001@gmail.com',
                to: `${user.email}`,
                subject: `Phản hồi yêu cầu hợp tác`,
                text: `Yêu cầu hợp tác của bạn đã xác nhận, hãy đăng nhập và truy cập đường link sau: http://localhost:4200/admin/my-clinic để tạo thông tin phòng khám của bạn.`
            }

            transporter.sendMail(options, (err, info) => {
                if (err) {
                    console.log(err);
                    res.status(500).send("Internal Server Error");
                } else {
                    console.log("Email sent " + info );
                    res.status(200).json("Doctor has been created")
                }
            })

            

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
    deleteDoctor = async (req, res) => {
        try {
            const removeDoctor = await Doctor.findOneAndRemove({ _id: req.params.doctorId });
            if (!removeDoctor) {
                return res.status(404).json("Doctor not found")
            }

            const userId = removeDoctor.userId;
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json("User not found")
            }

            user.role = "user";
            await user.save();

            res.status(200).send(removeDoctor)
        }
        catch (err) {
            res.status(500).send(err)
        }

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
