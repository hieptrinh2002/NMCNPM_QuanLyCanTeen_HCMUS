// Modal
var modal = document.getElementById("myModal");
var btn = document.getElementById("cart");
var close = document.getElementsByClassName("close")[0];
var close_zalopay = document.getElementsByClassName("close")[1];
var close_momo = document.getElementsByClassName("close")[2];


let payment = document.getElementById("btn-payment");
let thanhcong = document.getElementById("success");

let btn_zalo = document.getElementById("btn-zalopay")
let zalo_qr_img = document.getElementById("zalopay_qr")

let btn_momo = document.getElementById("btn-momo")
let momo_qr_img = document.getElementById("momo_qr")
// tại sao lại có [0] như  thế này bởi vì mỗi close là một html colection nên khi mình muốn lấy giá trị html thì phải thêm [0]. 
// Nếu mình có 2 cái component cùng class thì khi [0] nó sẽ hiển thị component 1 còn [1] thì nó sẽ hiển thị component 2.
var close_footer = document.getElementsByClassName("close-footer")[0];
var order = document.getElementsByClassName("order")[0];
btn.onclick = function () {
    modal.style.display = "block";
}
close.onclick = function () {
    modal.style.display = "none";
}

// order.onclick = function () {
//   alert("Cảm ơn bạn đã thanh toán đơn hàng")
// }
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

console.log("sadasa")

payment.onclick = function () {
    thanhcong.style.display = "block"
}

// zalopay_qrcode
btn_zalo.onclick = function () {
    zalo_qr_img.style.display = "block";
}


close_zalopay.onclick = function () {
    zalo_qr_img.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == zalo_qr_img) {
        zalo_qr_img.style.display = "none";
    }
}

// momo_qrcode

btn_momo.onclick = function () {
    momo_qr_img.style.display = "block";
}


close_momo.onclick = function () {
    momo_qr_img.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == momo_qr_img) {
        momo_qr_img.style.display = "none";
    }
}