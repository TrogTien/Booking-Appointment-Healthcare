const { Appointment } = require('../models/Appointment.model');
const { Doctor } = require('../models/Doctor.model');
const { History } = require('../models/History.model');
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

            const { day, appointmentTime} = req.body;

            const existingAppointment = await Appointment.findOne({
                day: day,
                appointmentTime: appointmentTime,
                status: "đã xác nhận"
            })

            if (existingAppointment) {
                return res.status(400).json("Lịch hẹn đã có người đặt");
                // Bad Request
            }
            
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
    updateAppointment = async (req, res) => {
        try {
            const updateAppointment = await Appointment.findOneAndUpdate(
                { _id: req.params.appointmentId},
                { $set: req.body },
                { new: true }
            )

            if (!updateAppointment) {
                return res.status(404).json("Appointment not found");
            }

            const duplicateAppointments = await Appointment.deleteMany({
                day: updateAppointment.day,
                appointmentTime: updateAppointment.appointmentTime,
                status: "chưa xác nhận"
            })
            
            
            
            //send mail
            
            const doctor = await Doctor.findById(updateAppointment.doctorId);
            const user = await User.findById(updateAppointment.userId);
            
            const day = updateAppointment.day.getDate();
            const month = updateAppointment.day.getMonth() + 1;
            const year = updateAppointment.day.getFullYear();


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
                subject: `Xác nhận đặt lịch khám bệnh`,
                text: `Bác sĩ ${doctor.name} đã xác nhận lịch khám của bạn, vui lòng tới phòng khám vào lúc: ${updateAppointment.appointmentTime} - Ngày ${day}/${month}/${year} tại địa chỉ: ${doctor.address}`
            }

            transporter.sendMail(options, (err, info) => {
                if (err) {
                    console.log(err);
                    res.status(500).send("Internal Server Error");
                } else {
                    console.log("Email sent " + info );
                    res.status(200).send(updateAppointment);
                }
            })


        }
        catch (err) {
            res.status(500).send(err)
        }
       
    }

    // [DELETE] /api/appointments/:appointmentId
    deleteAppointment = async (req, res) => {
        try {
            const deleteAppointment = await Appointment.findOneAndRemove({_id: req.params.appointmentId});
            if (!deleteAppointment) {
                return res.status(404).json("Appointment not found")
            }

            const history = await History.find({
                patientName: deleteAppointment.patientName,
                day: deleteAppointment.day,
                appointmentTime: deleteAppointment.appointmentTime,
                doctorId: deleteAppointment.doctorId,
                userId: deleteAppointment.userId
            })

            if (history.length > 0) {
                return res.status(400).json("Don't need to send email."); 
            }

            const doctor = await Doctor.findById(deleteAppointment.doctorId);
            const user = await User.findById(deleteAppointment.userId);

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
                subject: `Hủy lịch khám bệnh`,
                text: `Lịch của bạn với Bác sĩ ${doctor.name} đã bị hủy. Xin lỗi vì đã làm phiền.`
            }
            
            transporter.sendMail(options, (err, info) => {
                if (err) {  
                    console.log(err);
                    res.status(500).send("Internal Server Error");
                } else {
                    console.log("Email sent " + info );
                    res.status(200).send("Lịch đã bị hủy");
                }
            })
        }
        catch (err) {
            res.status(500).send(err)
        }

       
    }


    // [GET] /api/appointments/checkIsConfirmed-time?day=...&appointmentTime=...&doctorId =....
    checkIsConfirmed = async (req, res) => {
        try {
            const { day, appointmentTime, doctorId } = req.query;


            const appointment = await Appointment.findOne({
                day,
                appointmentTime,
                doctorId,
                status: 'đã xác nhận',
            });

            if (appointment) {
                return res.status(400).json("Thời gian đã có lịch");
            }

            res.status(200).json("Thời gian chưa được đặt")

        }
        catch (err) {
            res.status(500).send(err);
        }
    }
    

    // [GET] /api/appointments/countDocument
    countDocument = async (req, res) => {
        try {
            const countDoctors = await Doctor.countDocuments();
            const countUser = await User.countDocuments({ role: "user"});
            const countHistories = await History.countDocuments();

            res.status(200).json({
                countDoctors,
                countUser,
                countHistories
            })
        }
        catch (err) {
            res.status(500).send(err)
        }
    }


}

module.exports = new AppointmentsController();
