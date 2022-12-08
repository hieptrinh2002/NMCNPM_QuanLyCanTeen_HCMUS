const express = require('express'); // find module in node_modules
const router = express.Router();
const apiController = require('../controllers/api.controller');


router.post('/users', apiController.post);
// staff API
router.get('/staffs', apiController.getStaffs);
//product API
router.get('/products', apiController.getProducts);
//customer API
router.get('/customers', apiController.getCustomers);


module.exports = router;