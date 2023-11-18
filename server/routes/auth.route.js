const express = require('express');
const router = express.Router();

const authController = require('../app/controllers/auth.controller');

const authMiddleware = require('../app/middleware/auth.middleware')


router.post('/register', authController.registerUser)
router.post('/login', authController.loginUser)

router.post('/accessToken', authMiddleware.verifyRefreshToken, authController.requestNewAccessToken)
router.get('/checkLogin', authMiddleware.authenticate, authController.checkLogin)

module.exports = router;