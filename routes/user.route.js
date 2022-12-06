const express = require('express'); // find module in node_modules
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/', userController.getProducts)
//router.get('/get', userController.getSatff_byID)
//router.post('/', userController.post);


module.exports = router