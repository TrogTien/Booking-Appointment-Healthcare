const { Appointment } = require('../models/Appointment.model');
const { Doctor } = require('../models/Doctor.model');
const { User } = require('../models/User.model');

const nodemailer = require('nodemailer');

class AppointmentsController {

    // [GET] /api/appointments
    readAllAppointment = async (req, res) => {
        try {
            const _userId = req.user_id;
            const doctor = await Doctor.findOne({userId: _userId });

            const appointments = await Appointment.find({ doctorId: doctor._id});
            res.send(appointments)
        }
        catch (err) {
            res.send(err);
        }
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
    createAppointment = async (req, res) => {
        try {
            
            const newAppointment = new Appointment( req.body );
            
            const appointment = await newAppointment.save();


            const doctor = await Doctor.findById(appointment.doctorId);
            const user = await User.findById(appointment.userId);
            
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
                subject: `Phản hồi đặt lịch khám bệnh`,
                text: `Lịch khám của bạn và Bác sĩ ${doctor.name} đã được gửi và đang chờ xác nhận.`
            }

            transporter.sendMail(options, (err, info) => {
                if (err) {
                    console.log(err);
                    res.status(500).send("Internal Server Error");
                } else {
                    console.log("Email sent " + info );
                    res.status(200).send(appointment);
                }
            })

        } catch (err) {
            res.status(500).json(err)
        }
        
          
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
