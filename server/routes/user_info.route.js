const express = require('express');
const router = express.Router();

const userInfoController = require('../app/controllers/userInfo.controller');

const authMiddleware = require('../app/middleware/auth.middleware');

router.get('/', userInfoController.readAllUserInfos)
router.post('/', userInfoController.createUserInfo)
router.get('/:userInfoId', userInfoController.readUserInfo)
router.patch('/:userInfoId', userInfoController.updateUserInfo)

module.exports = router