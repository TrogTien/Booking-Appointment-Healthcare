const express = require('express')
const router = express.Router()

const medicalFieldsController = require('../app/controllers/medicalFields.controller')

router.get('/:medicalFieldId', medicalFieldsController.readMedicalField)
router.patch('/:medicalFieldId', medicalFieldsController.updateMedicalField)
router.delete('/:medicalFieldId', medicalFieldsController.deleteMedicalField)

router.get('/', medicalFieldsController.readAllMedicalField)
router.post('/', medicalFieldsController.createMedicalField)


module.exports = router
