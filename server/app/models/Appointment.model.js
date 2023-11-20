const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: true,
        maxLength: 50,
    },
    phone: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    day: {
        type: Date,
        required: true
    },
    appointmentTime: {
        type: String,
        required: true
    },
    symptoms: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    doctorId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
   

}, { timestamps: true})

const Appointment = mongoose.model('Appointment', AppointmentSchema);

module.exports = { Appointment };