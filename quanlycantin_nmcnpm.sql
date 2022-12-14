-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3307
-- Generation Time: Dec 14, 2022 at 07:17 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quanlycantin_nmcnpm`
--
CREATE DATABASE IF NOT EXISTS `quanlycantin_nmcnpm` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `quanlycantin_nmcnpm`;

-- --------------------------------------------------------

--
-- Table structure for table `bill_order`
--

CREATE TABLE `bill_order` (
  `id` int(11) NOT NULL,
  `date_created` datetime NOT NULL,
  `total_money` float NOT NULL,
  `customer_id` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `staff_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bill_order_detail`
--

CREATE TABLE `bill_order_detail` (
  `product_id` int(11) NOT NULL,
  `bill_order_id` int(11) NOT NULL,
  `total_money` float DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `customer_id` int(11) NOT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `money_available` float DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `id_card` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`customer_id`, `fullname`, `phone`, `money_available`, `email`, `id_card`) VALUES
(1, 'Trịnh Hữu Hiệp', '0977120682', 100000, 'Hieptrinh@gmail.com', 12345678),
(2, 'Trần Nhật Trường', '0977120682', 500000, 'Truong@gmail.com', 42424242),
(3, 'Khánh Đăng', '0944120682', 900000, 'kahnhtranffa@gmail.com', 14243784),
(4, 'Lý Hoàng Phát', '0977120644', 200000, 'hoangpat@gmail.com', 84738425),
(5, 'Lý Thái Phong', '0835045769', 500000, 'ThaiPhong@gmail.com', 95707118),
(6, 'Lý Thái Phong', '0835045769', 500000, 'ThaiPhong@gmail.com', 40877131),
(7, 'Lý Thái Hòa', '0835045799', 200000, 'ThaiHoa@gmail.com', 75048730),
(8, 'Trần Văn Quý', '0835045733', 200000, 'Quy@gmail.com', 79977563),
(15, 'Trần Văn Sơn', '0835045798', 200000, 'Son@gmail.com', 65886436),
(16, 'Trần Văn Sơn', '0835045798', 200000, 'Son@gmail.com', 100985165),
(17, 'Trần Văn Sơn', '0835045798', 200000, 'Son@gmail.com', 29403949),
(18, 'Trần Văn Sơn', '0835045798', 200000, 'Son@gmail.com', 85910970),
(19, 'Trần Văn Sơn', '0835045798', 200000, 'Son@gmail.com', 67203633),
(20, 'Trần Văn Sơn', '0835045798', 200000, 'Son@gmail.com', 54570490),
(21, 'Trần Văn Sơn', '0835045798', 200000, 'Son@gmail.com', 70908238),
(22, 'Trần Văn Sơn', '0835045798', 200000, 'Son@gmail.com', 14933054),
(23, 'Trần Văn Sơn', '0835045798', 200000, 'Son@gmail.com', 84365338),
(24, 'Trần Văn Sơn', '0835045798', 200000, 'Son@gmail.com', 47573478),
(25, 'Trần Văn Sơn', '0835045798', 200000, 'Son@gmail.com', 28811446),
(26, 'Trần Văn Sơn', '0835045798', 200000, 'Son@gmail.com', 49303290);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_type` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `image_link` varchar(200) NOT NULL,
  `status` varchar(50) NOT NULL,
  `price` float NOT NULL,
  `quantity_availble` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `product_name`, `product_type`, `description`, `image_link`, `status`, `price`, `quantity_availble`) VALUES
(1, 'Trà xanh không độ', 1, 'trà xanh từ thiên nhiên ,0% chất tạo mùi , tốt cho sức khỏe', 'https://cdn.tgdd.vn/Products/Images/8938/200303/bhx/6-chai-tra-xanh-khong-do-vi-chanh-455ml-202103290825331304.jpg', '1', 10000, 50),
(2, 'sữa cô gái hà Lan', 1, 'sữa tươi sạch , bổ sung nhiều chất có lợi cho sức khỏe', 'https://suachobeyeu.vn/upload/images/sua-tiet-trung-co-gai-ha-lan-khong-duong-bich-220ml-1.jpg', '1', 5000, 50),
(3, 'Cơm tấm', 0, 'cơm tấm sử dụng nguyên liệu tươi, sạch', 'https://statics.vinpearl.com/com-tam-ngon-o-sai-gon-0_1630563211.jpg', '1', 45000, 100),
(4, 'Bún bò Huế', 0, 'Bún bò gốc Huế gia truyền', 'https://i.ytimg.com/vi/A_o2qfaTgKs/maxresdefault.jpg', '1', 55000, 100),
(6, 'Cơm cá hồi', 0, 'nguyên liệu chất lượng , giàu dinh dưỡng', 'https://cdn.tgdd.vn/2020/08/CookProduct/ava-1200x676-38.jpg', '1', 40000, 100),
(8, 'Bánh bèo Huế', 0, 'bánh bèo gốc Huế', 'https://cdn.tgdd.vn/Files/2017/03/21/963426/cach-lam-banh-beo-thom-ngon-202110041645542724.jpg', '1', 30000, 100),
(9, 'bánh xèo', 0, 'bánh xèo ngon , đạt chất lượng an toàn vện sinh thực phẩm', 'https://cdn.tgdd.vn/Files/2020/05/20/1256908/troi-mua-thu-lam-banh-xeo-kieu-mien-bac-gion-ngon-it-dau-mo-202005201034115966.jpg', '1', 40000, 100000),
(10, 'bánh khọt', 0, 'ngon ,an toàn thực phẩm', 'NULL', '1', 10000, 0),
(86, 'Cơm hến', 0, 'Cơm hến chuẩn vị', 'NULL', '1', 30000, 0);

-- --------------------------------------------------------

--
-- Table structure for table `quantity_update`
--

CREATE TABLE `quantity_update` (
  `staff_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `date` datetime DEFAULT NULL,
  `extraQuantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `staff_id` int(11) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `gmail` varchar(255) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `gender` varchar(5) NOT NULL,
  `yearOfBirth` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`staff_id`, `fullname`, `gmail`, `phone`, `gender`, `yearOfBirth`, `username`, `password`) VALUES
(1, 'Tran Van A', 'tva@gmail.com', '0977120643', 'Nam', 1999, 'tva123', '12345'),
(3, 'Tran Van D', 'tvd@gmail.com', '0977120643', 'Nam', 1999, 'tvd123', '12345'),
(4, 'Tran Van B', 'tvb@gmail.com', '0977120643', 'Nam', 1999, 'tvC123', '12345'),
(5, 'Tran Van C', 'tvC@gmail.com', '0977120643', 'Nam', 1999, 'tva123', '12345');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bill_order`
--
ALTER TABLE `bill_order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_bill_order_staff` (`staff_id`),
  ADD KEY `fk_bill_order_customer` (`customer_id`);

--
-- Indexes for table `bill_order_detail`
--
ALTER TABLE `bill_order_detail`
  ADD PRIMARY KEY (`product_id`,`bill_order_id`),
  ADD KEY `fk_order_detail_order` (`bill_order_id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`customer_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `quantity_update`
--
ALTER TABLE `quantity_update`
  ADD PRIMARY KEY (`staff_id`,`product_id`),
  ADD KEY `fk_quantity_update_Product` (`product_id`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`staff_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bill_order`
--
ALTER TABLE `bill_order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `staff_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bill_order`
--
ALTER TABLE `bill_order`
  ADD CONSTRAINT `fk_bill_order_customer` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`),
  ADD CONSTRAINT `fk_bill_order_staff` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`staff_id`);

--
-- Constraints for table `bill_order_detail`
--
ALTER TABLE `bill_order_detail`
  ADD CONSTRAINT `fk_order_detail_order` FOREIGN KEY (`bill_order_id`) REFERENCES `bill_order` (`id`),
  ADD CONSTRAINT `fk_order_detail_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`);

--
-- Constraints for table `quantity_update`
--
ALTER TABLE `quantity_update`
  ADD CONSTRAINT `fk_order_detail_order_NhanVien` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`staff_id`),
  ADD CONSTRAINT `fk_quantity_update_Product` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
