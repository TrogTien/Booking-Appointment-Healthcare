const express = require('express')
const router = express.Router()

const historyController = require('../app/controllers/history.controller');

const authMiddleware = require('../app/middleware/auth.middleware');

router.get('/allPatientByAdmin', authMiddleware.authenticate ,authMiddleware.isAdmin, historyController.countAllPatientByAdmin);
router.get('/quantityPatient', authMiddleware.authenticate, historyController.countPatientByDoctor);

router.post('/', authMiddleware.authenticate, historyController.createHistory);
router.get('/', authMiddleware.authenticate, historyController.readAllHistories);




module.exports = router
