const express = require('express')
const router = express.Router()

const historyController = require('../app/controllers/history.controller');


router.post('/', historyController.createHistory);
router.get('/', historyController.readAllHistories);




module.exports = router
