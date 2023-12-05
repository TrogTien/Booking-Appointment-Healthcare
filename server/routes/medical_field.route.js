const express = require('express')
const router = express.Router()

const multer = require('multer');

const medicalFieldsController = require('../app/controllers/medicalFields.controller')
const authMiddleware = require('../app/middleware/auth.middleware');


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

router.post('/upload', upload.single("image"), authMiddleware.authenticate, medicalFieldsController.uploadImage)

router.get('/:medicalFieldId', medicalFieldsController.readMedicalField)
router.patch('/:medicalFieldId', authMiddleware.authenticate, medicalFieldsController.updateMedicalField)
router.delete('/:medicalFieldId', authMiddleware.authenticate, medicalFieldsController.deleteMedicalField)

router.get('/', medicalFieldsController.readAllMedicalField)
router.post('/', upload.single("image"), authMiddleware.authenticate, medicalFieldsController.createMedicalField)


module.exports = router
