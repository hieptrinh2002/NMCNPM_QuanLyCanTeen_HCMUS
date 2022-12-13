const express = require('express');
const ThucDonrouter = express.Router();
const ThucDoncontroller = require('../../controllers/staff/thuc_don.controller')


ThucDonrouter.get('/',ThucDoncontroller.get_menu); // xong
ThucDonrouter.post('/them_mon_an', ThucDoncontroller.post_add_food)// xong
ThucDonrouter.get('/them_mon_an', ThucDoncontroller.get_add_food);

    

module.exports = ThucDonrouter;
