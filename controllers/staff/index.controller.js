const db = require('../../models/database');

exports.post_Create_Card = async (req, res) => {
    const { fullname, email, phone, address, money }
        = req.body;
    console.log(req.body);
    console.log({ fullname, email, phone, address, money });
    let arrParams = [
        req.body.fullname,
        req.body.phone,
        req.body.money,
        req.body.email,
        Math.floor(Math.random() * 99999999 + 10000000)
    ]
    const sql = 'INSERT INTO `customer` (`customer_id`, `fullname`, `phone`, `money_available`, `email`, `id_card`) VALUES (NULL,?,?,?,?,?)';
    try {
        db.connectDB()
            .then((conection) => {
                conection.query(sql, arrParams, function (err, result, fields) {
                    if (err) throw err;
                    else {
                        console.log(result);
                        db.closeDB(conection);
                        return res.status(200).json("tạo thẻ thành công");
                    }
                })
            })
    } catch (error) {
        console.log("errrrorrr")
        res.status(200).json(error)
    }

}