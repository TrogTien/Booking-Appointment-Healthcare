const mongoose = require('mongoose');

const MedicalFieldSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 50,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
   

})

const MedicalField = mongoose.model('MedicalField', MedicalFieldSchema);

module.exports = { MedicalField };