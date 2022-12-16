const express = require('express');
const router = express.Router();
const controller = require('../../controllers/staff/index.controller')

//router.get('/',controller.(Trang_chu));

//router.use('/thuc_don',menuRoute); 
router.get('/thuc_don',controller.get_menu); // xong
router.post('/thuc_don/them_mon_an', controller.post_add_food)// xong
router.get('/thuc_don/them_mon_an', controller.get_add_food);

router.get('/khach_hang',controller.get_customers); 
router.post('/khach_hang/nap_tien', controller.get_customers);
router.post('/khach_hang/nap_tien/:id', controller.post_add_money);
router.get('/khach_hang/nap_tien/:id', controller.get_add_money);

router.post('/tao_the', controller.post_Create_Card);
router.get('/tao_the', controller.get_Create_Card);

router.get('/kho_hang',controller.get_wavehouse);
router.post('/kho_hang/cap_nhat_kho/:id',controller.post_update_quantity);
router.get('/kho_hang/cap_nhat_kho/:id',controller.get_update_quantity);

router.get('/nhan_vien',controller.get_staffs);//chỉ hiển thị ra


//router.get('/thong_ke',controller.(thong_ke)); // theo tuần, theo tháng
//router.post('/thanh_toan',controller.(thanh_toan));


router.get('/demo', controller.get_demo);

module.exports = router;
