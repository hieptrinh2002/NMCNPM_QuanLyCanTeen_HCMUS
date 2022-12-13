const express = require('express');
const router = express.Router();
const controller = require('../../controllers/staff/index.controller')


//router.get('/',controller.(Trang_chu));

//router.use('/thuc_don',menuRoute); // xong
router.get('/thuc_don',controller.get_menu); // xong
router.post('/thuc_don/them_mon_an', controller.post_add_food)// xong
router.get('/thuc_don/them_mon_an', controller.get_add_food);



//router.get('/kho_hang',controller.(kho_hang));


//router.get('/khach_hang',controller.(khach_hang)); // nạp tiền ....
router.post('/tao_the', controller.post_Create_Card);//xong

//router.get('/thong_ke',controller.(thong_ke)); // theo tuần, theo tháng
//router.get('/nhan_vien',controller.(nhan_vien));//chỉ hiển thị ra


//router.post('/thanh_toan',controller.(thanh_toan));


router.get('/demo', controller.get_demo);

module.exports = router;
