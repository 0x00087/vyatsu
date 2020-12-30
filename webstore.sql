-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: webstore
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `catagory`
--

DROP TABLE IF EXISTS `catagory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `catagory` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `ID_Goods` int NOT NULL,
  `Catagory` varchar(100) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `id_gds_idx` (`ID_Goods`),
  CONSTRAINT `id_gds` FOREIGN KEY (`ID_Goods`) REFERENCES `goods` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `catagory`
--

LOCK TABLES `catagory` WRITE;
/*!40000 ALTER TABLE `catagory` DISABLE KEYS */;
INSERT INTO `catagory` VALUES (1,1,'Chair'),(2,1,'Furniture'),(3,2,'Accesories'),(4,2,'Home Deco'),(5,3,'Chair'),(6,3,'Furniture'),(7,4,'Accesories'),(8,4,'Home Deco'),(9,5,'Table'),(10,5,'Furniture'),(11,6,'Furniture'),(12,6,'Home Deco'),(13,7,'Chair'),(14,7,'Home Deco'),(15,8,'Home Deco'),(16,8,'Accesories'),(17,9,'Chair'),(18,9,'Furniture');
/*!40000 ALTER TABLE `catagory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `First_Name` varchar(45) NOT NULL,
  `Second_Name` varchar(45) NOT NULL,
  `Username` varchar(20) NOT NULL,
  `Email` varchar(45) NOT NULL,
  `Password` varchar(100) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'Michael','Kozyukov','qwerty','example@gmail.com','Qwerty1'),(2,'Michael','Ivanov','simple','simple@gmail.com','Qwerty1'),(3,'Ivan','Petrov','hard','hard@gmail.com','Qwerty1'),(4,'Helen','Helen','ytrewq','asd@gmail.com','Qwerty1'),(5,'asd','qwe','ytrewq','asdy@gmail.com','qwerQ23');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `goods`
--

DROP TABLE IF EXISTS `goods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `goods` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL,
  `Description` text,
  `Price` int NOT NULL,
  `Producer` varchar(50) NOT NULL,
  `Date` date NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goods`
--

LOCK TABLES `goods` WRITE;
/*!40000 ALTER TABLE `goods` DISABLE KEYS */;
INSERT INTO `goods` VALUES (1,'Modern Chair','Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid quae eveniet culpa officia quidem mollitia impedit iste asperiores nisi reprehenderit consequatur, autem, nostrum pariatur enim?',180,'IKEA','2020-12-20'),(2,'Minimalistic Plant Pot','Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid quae eveniet culpa officia quidem mollitia impedit iste asperiores nisi reprehenderit consequatur, autem, nostrum pariatur enim?',30,'Amado','2020-12-19'),(3,'Modern Chair','Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid quae eveniet culpa officia quidem mollitia impedit iste asperiores nisi reprehenderit consequatur, autem, nostrum pariatur enim?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid quae eveniet culpa officia quidem mollitia impedit iste asperiores nisi reprehenderit consequatur, autem, nostrum pariatur enim?',200,'Amado','2020-12-20'),(4,'Plant Pot','Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid quae eveniet culpa officia quidem mollitia impedit iste asperiores nisi reprehenderit consequatur, autem, nostrum pariatur enim?',18,'The Factory','2020-12-19'),(5,'Small Table','Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid quae eveniet culpa officia quidem mollitia impedit iste asperiores nisi reprehenderit consequatur, autem, nostrum pariatur enim?',320,'Furniture Inc','2020-12-17'),(6,'Night Stand','Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid quae eveniet culpa officia quidem mollitia impedit iste asperiores nisi reprehenderit consequatur, autem, nostrum pariatur enim?',415,'IKEA','2020-12-18'),(7,'Modern Rocking Chair','Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid quae eveniet culpa officia quidem mollitia impedit iste asperiores nisi reprehenderit consequatur, autem, nostrum pariatur enim?',318,'Furniture Inc','2020-12-15'),(8,'Home Deco','Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid quae eveniet culpa officia quidem mollitia impedit iste asperiores nisi reprehenderit consequatur, autem, nostrum pariatur enim?',50,'Artdeco','2020-12-18'),(9,'Metallic Chair','Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid quae eveniet culpa officia quidem mollitia impedit iste asperiores nisi reprehenderit consequatur, autem, nostrum pariatur enim?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid quae eveniet culpa officia quidem mollitia impedit iste asperiores nisi reprehenderit consequatur, autem, nostrum pariatur enim?',215,'The Factory','2020-12-21');
/*!40000 ALTER TABLE `goods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `ID_Customer` int NOT NULL,
  `Price` int NOT NULL,
  `Date` date NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_Custom_idx` (`ID_Customer`),
  CONSTRAINT `ID_Custom` FOREIGN KEY (`ID_Customer`) REFERENCES `customers` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (1,1,1024,'2020-12-11'),(2,1,2048,'2020-12-05'),(3,2,2131,'2020-12-07'),(4,1,840,'2020-12-29'),(5,1,840,'2020-12-29'),(6,1,840,'2020-12-29'),(7,1,840,'2020-12-29'),(8,1,840,'2020-12-29'),(9,1,840,'2020-12-29'),(10,1,840,'2020-12-29'),(11,1,270,'2020-12-29'),(12,1,18,'2020-12-29');
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `picture`
--

DROP TABLE IF EXISTS `picture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `picture` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `ID_Goods` int NOT NULL,
  `Path` varchar(100) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `id_idx` (`ID_Goods`),
  CONSTRAINT `id` FOREIGN KEY (`ID_Goods`) REFERENCES `goods` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `picture`
--

LOCK TABLES `picture` WRITE;
/*!40000 ALTER TABLE `picture` DISABLE KEYS */;
INSERT INTO `picture` VALUES (1,1,'img/bg-img/1.jpg'),(2,1,'img/product-img/product1.jpg'),(3,1,'img/product-img/product2.jpg'),(4,1,'img/product-img/pro-big-1.jpg'),(5,1,'img/product-img/pro-big-2.jpg'),(6,1,'img/product-img/pro-big-3.jpg'),(7,1,'img/product-img/pro-big-4.jpg'),(8,2,'img/bg-img/2.jpg'),(9,2,'img/product-img/product2.jpg'),(10,2,'img/product-img/product3.jpg'),(11,2,'img/product-img/pro-big-2.jpg'),(12,2,'img/product-img/pro-big-3.jpg'),(13,2,'img/product-img/pro-big-4.jpg'),(14,2,'img/product-img/pro-big-1.jpg'),(15,3,'img/bg-img/3.jpg'),(16,3,'img/product-img/product3.jpg'),(17,3,'img/product-img/product4.jpg'),(18,3,'img/product-img/pro-big-3.jpg'),(19,3,'img/product-img/pro-big-4.jpg'),(20,3,'img/product-img/pro-big-1.jpg'),(21,3,'img/product-img/pro-big-2.jpg'),(22,4,'img/bg-img/4.jpg'),(23,4,'img/product-img/product4.jpg'),(24,4,'img/product-img/product5.jpg'),(25,4,'img/product-img/pro-big-4.jpg'),(26,4,'img/product-img/pro-big-1.jpg'),(27,4,'img/product-img/pro-big-2.jpg'),(28,4,'img/product-img/pro-big-3.jpg'),(29,5,'img/bg-img/5.jpg'),(30,5,'img/product-img/product5.jpg'),(31,5,'img/product-img/product6.jpg'),(32,5,'img/product-img/pro-big-1.jpg'),(33,5,'img/product-img/pro-big-2.jpg'),(34,5,'img/product-img/pro-big-3.jpg'),(35,5,'img/product-img/pro-big-4.jpg'),(36,6,'img/bg-img/6.jpg'),(37,6,'img/product-img/product6.jpg'),(38,6,'img/product-img/product1.jpg'),(39,6,'img/product-img/pro-big-2.jpg'),(40,6,'img/product-img/pro-big-3.jpg'),(41,6,'img/product-img/pro-big-4.jpg'),(42,6,'img/product-img/pro-big-1.jpg'),(43,7,'img/bg-img/7.jpg'),(44,7,'img/product-img/product1.jpg'),(45,7,'img/product-img/product2.jpg'),(46,7,'img/product-img/pro-big-3.jpg'),(47,7,'img/product-img/pro-big-4.jpg'),(48,7,'img/product-img/pro-big-1.jpg'),(49,7,'img/product-img/pro-big-2.jpg'),(50,8,'img/bg-img/8.jpg'),(51,8,'img/product-img/product2.jpg'),(52,8,'img/product-img/product3.jpg'),(53,8,'img/product-img/pro-big-4.jpg'),(54,8,'img/product-img/pro-big-1.jpg'),(55,8,'img/product-img/pro-big-2.jpg'),(56,8,'img/product-img/pro-big-3.jpg'),(57,9,'img/bg-img/9.jpg'),(58,9,'img/product-img/product3.jpg'),(59,9,'img/product-img/product4.jpg'),(60,9,'img/product-img/pro-big-1.jpg'),(61,9,'img/product-img/pro-big-2.jpg'),(62,9,'img/product-img/pro-big-3.jpg'),(63,9,'img/product-img/pro-big-4.jpg');
/*!40000 ALTER TABLE `picture` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ratings`
--

DROP TABLE IF EXISTS `ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ratings` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `ID_Goods` int NOT NULL,
  `ID_Customer` int NOT NULL,
  `Rating` int NOT NULL DEFAULT '5',
  PRIMARY KEY (`ID`),
  KEY `id_goods_idx` (`ID_Goods`),
  KEY `id_customer_idx` (`ID_Customer`),
  CONSTRAINT `id_customer` FOREIGN KEY (`ID_Customer`) REFERENCES `customers` (`ID`),
  CONSTRAINT `id_goods` FOREIGN KEY (`ID_Goods`) REFERENCES `goods` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ratings`
--

LOCK TABLES `ratings` WRITE;
/*!40000 ALTER TABLE `ratings` DISABLE KEYS */;
INSERT INTO `ratings` VALUES (1,1,1,4),(2,2,1,3),(3,3,1,5),(4,4,1,2),(5,5,1,2),(6,6,1,1),(7,7,1,5),(8,8,1,5),(9,9,1,4),(10,1,2,3),(11,2,2,4),(12,3,2,4),(13,4,2,4),(14,5,2,4),(15,6,2,4),(16,7,2,4),(17,8,2,2),(18,9,2,1),(19,1,3,1),(20,2,3,1),(21,3,3,1),(22,4,3,2),(23,5,3,4),(24,6,3,3),(25,7,3,5),(26,8,3,2),(27,9,3,1);
/*!40000 ALTER TABLE `ratings` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-29  2:47:49
