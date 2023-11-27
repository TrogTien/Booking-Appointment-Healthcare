const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: true,
        maxLength: 50,
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

const History = mongoose.model('History', HistorySchema);

module.exports = { History };