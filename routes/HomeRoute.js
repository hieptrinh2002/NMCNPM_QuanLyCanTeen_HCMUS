const express = require('express');
const router = express.Router();
const controller = require("../controllers/staff/HomeController")
const route = express.Router();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5001;
const AuthController = require('../controllers/staff/AuthController');
const FoodController = require('../controllers/staff/FoodController')
const cartController = require("../controllers/staff/CartController")
const paymentController = require("../controllers/staff/paymentController")
const StorageController = require("../controllers/staff/StorageController")
const StatisticsController = require("../controllers/staff/StatisticsController")
router.get('/', controller.get_landingPage);

//router.get('/',controller.(Trang_chu));

router.get('/login',AuthController.showLogin);
router.post('/login',AuthController.LoginController);
router.post('/signin',AuthController.RegisterController)
router.get('/signin',AuthController.showRegister)
router.get('/index',FoodController.Show)
router.post('/index/add/:id',cartController.addFood)

//router.post('/index/add/:id',HomeRoutes.addFood)
let USER;
router.get("/payment",paymentController.chooseMethod)
router.post("/payment",paymentController.Payment)
router.get('/shop',(req,res)=>{
    res.render("../views/shop.pug")
})

router.get('/cart',cartController.viewCart)
router.get('/cart/update/:id',cartController.updateCart)

router.get("/payment/success",(req,res)=>{
    res.render("../views/success.pug")
})
router.get("/payment/unsuccess",(req,res)=>{
    res.render("../views/unsuccess.pug")
})
//thực đơn 
//router.use('/thuc_don',menuRoute); 
router.get('/thuc_don',controller.get_menu); // xong
router.post('/thuc_don/them_mon_an', controller.post_add_food)// xong
router.get('/thuc_don/them_mon_an', controller.get_add_food);
router.post('/thuc_don/reset', controller.post_reset);// xong


//khách hàng
router.get('/khach_hang',controller.get_customers); 
router.post('/khach_hang/nap_tien', controller.get_customers);
router.post('/khach_hang/nap_tien/:id', controller.post_add_money);
router.get('/khach_hang/nap_tien/:id', controller.get_add_money);
router.post('/tao_the', controller.post_Create_Card);
router.get('/tao_the', controller.get_Create_Card);


//kho hàng
router.get('/kho_hang',StorageController.get_wavehouse);
router.post('/kho_hang/cap_nhat_kho/:id',StorageController.post_update_quantity);
router.get('/kho_hang/cap_nhat_kho/:id',StorageController.get_update_quantity);


//nhân viên
router.get('/nhan_vien',controller.get_staffs);//chỉ hiển thị ra


//thống kê
router.get('/thong_ke',StatisticsController.get_statistical); // theo tuần, theo tháng
router.get('/thong_ke/theo_thang', StatisticsController.get_statistical_month);
router.post('/thong_ke/theo_ngay', StatisticsController.post_statistical_day);


module.exports = router;
