const express = require('express')
const router = express.Router()

const multer = require('multer');

const medicalFieldsController = require('../app/controllers/medicalFields.controller')

// Upload image
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
})

const upload = multer({ storage: storage });

router.post('/upload', upload.single("image"), medicalFieldsController.uploadImage)

router.get('/:medicalFieldId', medicalFieldsController.readMedicalField)
router.patch('/:medicalFieldId', medicalFieldsController.updateMedicalField)
router.delete('/:medicalFieldId', medicalFieldsController.deleteMedicalField)

router.get('/', medicalFieldsController.readAllMedicalField)
router.post('/', upload.single("image"), medicalFieldsController.createMedicalField)


module.exports = router
