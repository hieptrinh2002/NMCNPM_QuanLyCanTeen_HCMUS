const express = require('express'); // find module in node_modules
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/get', userController.get)
router.post('/', userController.post)

module.exports = router