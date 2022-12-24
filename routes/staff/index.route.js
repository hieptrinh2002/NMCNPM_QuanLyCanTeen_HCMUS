const express = require('express');
const router = express.Router();
const controller = require('../../controllers/staff/index.controller')

router.get('/', controller.get_landingPage);

//router.get('/',controller.(Trang_chu));

router.get('/login',controller.get_login);
router.post('/login',controller.post_login);
router.get('/signin', controller.get_signin)
router.post('/signin')
router.get('/trang_chu',controller.get_homePage);

//thực đơn 
//router.use('/thuc_don',menuRoute); 
router.get('/thuc_don',controller.get_menu); // xong
router.post('/thuc_don/them_mon_an', controller.post_add_food)// xong
router.get('/thuc_don/them_mon_an', controller.get_add_food);


//khách hàng
router.get('/khach_hang',controller.get_customers); 
router.post('/khach_hang/nap_tien', controller.get_customers);
router.post('/khach_hang/nap_tien/:id', controller.post_add_money);
router.get('/khach_hang/nap_tien/:id', controller.get_add_money);
router.post('/tao_the', controller.post_Create_Card);
router.get('/tao_the', controller.get_Create_Card);


//kho hàng
router.get('/kho_hang',controller.get_wavehouse);
router.post('/kho_hang/cap_nhat_kho/:id',controller.post_update_quantity);
router.get('/kho_hang/cap_nhat_kho/:id',controller.get_update_quantity);


//nhân viên
router.get('/nhan_vien',controller.get_staffs);//chỉ hiển thị ra


//thống kê
router.get('/thong_ke',controller.get_statistical); // theo tuần, theo tháng
router.get('/thong_ke/theo_thang', controller.get_statistical_month);
router.post('/thong_ke/theo_ngay', controller.post_statistical_day);


module.exports = router;
