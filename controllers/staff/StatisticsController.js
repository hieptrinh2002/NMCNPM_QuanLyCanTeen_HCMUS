
const db = require('../../models/database');
exports.get_statistical = async(req,res)=>{
    if(res.locals.user == null)
    {
        res.redirect('/');
    }
    let today = new Date();
    let arrParams =[today];
    console.log(today);

    const sql = 'select b.product_id , p.product_name , p.price ,count(*) as SoLuong , SUM(p.price) as'
            +' TongTien , (DATE(bill.date_created)) as Ngay from bill_order_detail as b , product as p , bill_order as bill'
            +' where b.product_id = p.product_id and DATE(bill.date_created) = ?'
            +' GROUP BY b.product_id , p.product_name'
            try {
                db.connectDB()
                    .then((conection) => {
                        conection.query(sql, arrParams, function (err, result, fields) {
                            if (err) throw err;
                            else {
                                db.closeDB(conection);
                                console.log(result);
                                let total = 0;
                                result.map((item)=>{
                                    total+=item.TongTien;
                                    item.Ngay = req.body.date;
                                })
                               
                                let products = result;

                                console.log(total);
                               
                                return res.render('./statistical.pug', {products:products , total : total});
                            }
                        })
                    })
            }
            catch (error) {
                console.log("error")
                res.status(200).json(error);
                s
            }
}


exports.post_statistical_day = async(req,res)=>{
    var date = req.body.date;
    let arrParams =[req.body.date];

    const sql = 'select b.product_id , p.product_name , p.price ,count(*) as SoLuong , SUM(p.price) as'
            +' TongTien , (DATE(bill.date_created)) as Ngay from bill_order_detail as b , product as p , bill_order as bill'
            +' where b.product_id = p.product_id and DATE(bill.date_created) = ?'
            +' GROUP BY b.product_id , p.product_name'
            try {
                db.connectDB()
                    .then((conection) => {
                        conection.query(sql, arrParams, function (err, result, fields) {
                            if (err) throw err;
                            else {
                                db.closeDB(conection);
                                console.log(result);
                                let total = 0;
                                result.map((item)=>{
                                    total+=item.TongTien;
                                    item.Ngay = req.body.date;
                                })
                               
                                let products = result;

                                console.log(total);
                                console.log(date);
                                return res.render('./statistical_day.pug', {products:products , total : total , date : date});
                            }
                        })
                    })

            }
            catch (error) {
                console.log("error")
                res.status(200).json(error);
                s
            }
}
exports.get_statistical_month = async(req,res)=>{
    if(res.locals.user == null)
    {
        res.redirect('/');
    }
    let today = new Date();
    console.log(today.getFullYear());
    const sql = 'CALL `thongKe`(?)'
            try {
                db.connectDB()
                    .then((conection) => {
                        conection.query(sql,[today.getFullYear()], function (err, result, fields) {
                            if (err) throw err;
                            else {
                                db.closeDB(conection);
                                let array_EachMonth = [] , i = 0 ;
                                result.map((item)=>{
                                    i++
                                    if(i<=12)
                                    {
                                        if(item[0].total == null){array_EachMonth.push(0);}
                                        else{array_EachMonth.push(item[0].total);}
                                    }     
                                })
                                console.log(array_EachMonth);
                                return res.render('./statistical_month.pug',
                                {
                                    array_EachMonth : array_EachMonth,
                                    year: parseInt(today.getFullYear())
                                });
                              
                            }
                        })
                    })
            }
            catch (error) {
                console.log("error")
                res.status(200).json(error);
            }

            
}
