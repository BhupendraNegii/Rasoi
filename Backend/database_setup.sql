-- ============================================
-- MySQL Database Setup Script
-- Based on ERD Schema
-- For MySQL Workbench
-- ============================================

-- Step 1: Drop existing database (if exists)
DROP DATABASE IF EXISTS `foodDeliveryApp`;

-- Step 2: Create new database
CREATE DATABASE `foodDeliveryApp` 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- Step 3: Use the database
USE `foodDeliveryApp`;

-- ============================================
-- Create Tables According to ERD
-- ============================================

-- ============================================
-- 1. Users Table
-- ============================================
CREATE TABLE IF NOT EXISTS `Users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(255) NOT NULL,
  `Email` VARCHAR(255) NOT NULL UNIQUE,
  `Password` VARCHAR(255) NOT NULL,
  `Cart_data` JSON DEFAULT NULL,
  `Favorite_item` JSON DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 2. Food_items Table
-- ============================================
CREATE TABLE IF NOT EXISTS `Food_items` (
  `Food_id` INT NOT NULL AUTO_INCREMENT,
  `Food_Name` VARCHAR(255) NOT NULL,
  `Amount` DECIMAL(10, 2) NOT NULL,
  `Category` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `image` VARCHAR(255) NULL,
  PRIMARY KEY (`Food_id`),
  INDEX `idx_category` (`Category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 3. Orders Table
-- ============================================
CREATE TABLE IF NOT EXISTS `Orders` (
  `Order_id` INT NOT NULL AUTO_INCREMENT,
  `User_id` INT NOT NULL,
  `Phone_No` VARCHAR(255) NULL,
  `Address` VARCHAR(255) NULL,
  `Status` ENUM('Pending', 'Food Processing', 'Out for Delivery', 'Delivered', 'Cancelled') DEFAULT 'Pending' NOT NULL,
  `Amount` DECIMAL(10, 2) NOT NULL,
  `Food_id` INT NULL,
  `items` JSON NULL,
  `address` JSON NULL,
  `payment` BOOLEAN DEFAULT FALSE,
  `date` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Order_id`),
  INDEX `idx_user_id` (`User_id`),
  INDEX `idx_food_id` (`Food_id`),
  INDEX `idx_status` (`Status`),
  FOREIGN KEY (`User_id`) REFERENCES `Users`(`user_id`) ON DELETE CASCADE,
  FOREIGN KEY (`Food_id`) REFERENCES `Food_items`(`Food_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 4. Transactions Table
-- ============================================
CREATE TABLE IF NOT EXISTS `Transactions` (
  `transaction_id` INT NOT NULL AUTO_INCREMENT,
  `Order_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `Datetime` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Payment_Amount` DECIMAL(10, 2) NOT NULL,
  PRIMARY KEY (`transaction_id`),
  INDEX `idx_order_id` (`Order_id`),
  INDEX `idx_user_id` (`user_id`),
  INDEX `idx_datetime` (`Datetime`),
  FOREIGN KEY (`Order_id`) REFERENCES `Orders`(`Order_id`) ON DELETE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 5. Track Table
-- ============================================
CREATE TABLE IF NOT EXISTS `Track` (
  `Order_id` INT NOT NULL,
  `Order_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Status` ENUM('Pending', 'Food Processing', 'Out for Delivery', 'Delivered', 'Cancelled') NOT NULL,
  `Uodate_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `User_id` INT NOT NULL,
  PRIMARY KEY (`Order_id`),
  INDEX `idx_user_id` (`User_id`),
  INDEX `idx_status` (`Status`),
  FOREIGN KEY (`Order_id`) REFERENCES `Orders`(`Order_id`) ON DELETE CASCADE,
  FOREIGN KEY (`User_id`) REFERENCES `Users`(`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Setup Complete!
-- ============================================
-- Tables created:
-- 1. Users (user_id, user_name, Email, Password, Cart_data, Favorite_item)
-- 2. Food_items (Food_id, Food_Name, Amount, Category, description, image)
-- 3. Orders (Order_id, User_id, Phone_No, Address, Status, Amount, Food_id)
-- 4. Transactions (transaction_id, Order_id, user_id, Datetime, Payment_Amount)
-- 5. Track (Order_id, Order_time, Status, Uodate_time, User_id)
-- ============================================
