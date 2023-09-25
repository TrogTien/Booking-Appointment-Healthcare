const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: true,
        maxLength: 50,
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    symptoms: {
        type: String,
        maxLength: 300,
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
    }
   

}, { timestamps: true})

const Appointment = mongoose.model('Appointment', AppointmentSchema);

module.exports = { Appointment };