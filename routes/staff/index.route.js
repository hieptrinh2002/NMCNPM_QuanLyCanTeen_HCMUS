const express = require('express');
const router = express.Router();
const controller = require('../../controllers/staff/index.controller')


//router.get('/',controller.(Trang_chu));

//router.use('/thuc_don',menuRoute); 
router.get('/thuc_don',controller.get_menu); // xong
router.post('/thuc_don/them_mon_an', controller.post_add_food)// xong
router.get('/thuc_don/them_mon_an', controller.get_add_food);

//td 
  //a(href="/api/products?id=" + product.product_id) View


router.get('/khach_hang',controller.get_customers); 
router.post('/tao_the', controller.post_Create_Card);//xong

router.get('/kho_hang',controller.get_wavehouse);
router.post('kho_hang/cap_nhat_kho/:id',controller.post_update_quantity);
//router.get('kho_hang/cap_nhat_kho/:id',controller.post_update_quantity);

router.get('/nhan_vien',controller.get_staffs);//chỉ hiển thị ra

//router.get('/thong_ke',controller.(thong_ke)); // theo tuần, theo tháng
//router.get('/nhan_vien',controller.(nhan_vien));//chỉ hiển thị ra

//router.post('/thanh_toan',controller.(thanh_toan));


router.get('/demo', controller.get_demo);

module.exports = router;
