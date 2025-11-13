-- ============================================
-- SQL Queries for Order Model
-- Table Name: orders
-- ============================================

-- ============================================
-- CREATE TABLE Statement
-- ============================================
CREATE TABLE IF NOT EXISTS `orders` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NOT NULL,
  `items` JSON NOT NULL,
  `amount` FLOAT NOT NULL,
  `address` JSON NOT NULL,
  `status` VARCHAR(255) DEFAULT 'Food Processing',
  `date` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `payment` BOOLEAN DEFAULT FALSE,
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_userId` (`userId`),
  INDEX `idx_status` (`status`),
  INDEX `idx_payment` (`payment`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- INSERT Queries
-- ============================================

-- Insert a new order
INSERT INTO `orders` (`userId`, `items`, `amount`, `address`, `status`, `payment`)
VALUES (
  1,
  JSON_ARRAY(
    JSON_OBJECT('name', 'Pizza', 'price', 12.99, 'quantity', 2),
    JSON_OBJECT('name', 'Burger', 'price', 8.99, 'quantity', 1)
  ),
  34.97,
  JSON_OBJECT(
    'firstName', 'John',
    'lastName', 'Doe',
    'street', '123 Main St',
    'city', 'Sydney',
    'state', 'NSW',
    'zipcode', '2000',
    'country', 'Australia',
    'phone', '0412345678'
  ),
  'Food Processing',
  FALSE
);

-- ============================================
-- SELECT Queries
-- ============================================

-- Get all orders
SELECT * FROM `orders`;

-- Get order by ID
SELECT * FROM `orders` WHERE `id` = 1;

-- Get all orders for a specific user
SELECT * FROM `orders` WHERE `userId` = 1 ORDER BY `date` DESC;

-- Get orders by status
SELECT * FROM `orders` WHERE `status` = 'Food Processing';

-- Get paid orders
SELECT * FROM `orders` WHERE `payment` = TRUE;

-- Get unpaid orders
SELECT * FROM `orders` WHERE `payment` = FALSE;

-- Get orders with total amount greater than a value
SELECT * FROM `orders` WHERE `amount` > 50.00;

-- Get orders within a date range
SELECT * FROM `orders` 
WHERE `date` BETWEEN '2024-01-01' AND '2024-12-31'
ORDER BY `date` DESC;

-- Get order count by status
SELECT `status`, COUNT(*) as `count` 
FROM `orders` 
GROUP BY `status`;

-- Get total revenue
SELECT SUM(`amount`) as `totalRevenue` 
FROM `orders` 
WHERE `payment` = TRUE;

-- Get user's total spent
SELECT SUM(`amount`) as `totalSpent` 
FROM `orders` 
WHERE `userId` = 1 AND `payment` = TRUE;

-- Get orders with JSON data extraction
SELECT 
  `id`,
  `userId`,
  JSON_EXTRACT(`items`, '$[0].name') as `firstItem`,
  JSON_EXTRACT(`address`, '$.city') as `city`,
  `amount`,
  `status`,
  `date`
FROM `orders`;

-- ============================================
-- UPDATE Queries
-- ============================================

-- Update order status
UPDATE `orders` 
SET `status` = 'Out-For-Delivery' 
WHERE `id` = 1;

-- Update payment status
UPDATE `orders` 
SET `payment` = TRUE 
WHERE `id` = 1;

-- Update order status for multiple orders
UPDATE `orders` 
SET `status` = 'Delivered' 
WHERE `status` = 'Out-For-Delivery' AND `payment` = TRUE;

-- Update order amount
UPDATE `orders` 
SET `amount` = 45.99 
WHERE `id` = 1;

-- ============================================
-- DELETE Queries
-- ============================================

-- Delete order by ID
DELETE FROM `orders` WHERE `id` = 1;

-- Delete unpaid orders older than 30 days
DELETE FROM `orders` 
WHERE `payment` = FALSE 
AND `date` < DATE_SUB(NOW(), INTERVAL 30 DAY);

-- Delete all orders for a user (use with caution)
DELETE FROM `orders` WHERE `userId` = 1;

-- ============================================
-- Advanced Queries
-- ============================================

-- Get orders with user information (if users table exists)
SELECT 
  o.`id`,
  o.`userId`,
  u.`name` as `userName`,
  u.`email` as `userEmail`,
  o.`amount`,
  o.`status`,
  o.`payment`,
  o.`date`
FROM `orders` o
LEFT JOIN `users` u ON o.`userId` = u.`id`
ORDER BY o.`date` DESC;

-- Get order statistics
SELECT 
  COUNT(*) as `totalOrders`,
  COUNT(CASE WHEN `payment` = TRUE THEN 1 END) as `paidOrders`,
  COUNT(CASE WHEN `payment` = FALSE THEN 1 END) as `unpaidOrders`,
  SUM(`amount`) as `totalAmount`,
  AVG(`amount`) as `averageAmount`,
  MAX(`amount`) as `maxAmount`,
  MIN(`amount`) as `minAmount`
FROM `orders`;

-- Get orders by month
SELECT 
  DATE_FORMAT(`date`, '%Y-%m') as `month`,
  COUNT(*) as `orderCount`,
  SUM(`amount`) as `totalRevenue`
FROM `orders`
WHERE `payment` = TRUE
GROUP BY DATE_FORMAT(`date`, '%Y-%m')
ORDER BY `month` DESC;

-- Get most recent orders
SELECT * FROM `orders` 
ORDER BY `date` DESC 
LIMIT 10;

-- Get orders with specific item (JSON search)
SELECT * FROM `orders`
WHERE JSON_SEARCH(`items`, 'one', 'Pizza', NULL, '$[*].name') IS NOT NULL;

-- ============================================
-- Indexes (for performance optimization)
-- ============================================

-- Add index on userId (if not already exists)
CREATE INDEX `idx_userId` ON `orders` (`userId`);

-- Add index on status (if not already exists)
CREATE INDEX `idx_status` ON `orders` (`status`);

-- Add index on payment (if not already exists)
CREATE INDEX `idx_payment` ON `orders` (`payment`);

-- Add composite index
CREATE INDEX `idx_user_status` ON `orders` (`userId`, `status`);

-- ============================================
-- ALTER TABLE Queries (for modifications)
-- ============================================

-- Add a new column
ALTER TABLE `orders` 
ADD COLUMN `deliveryTime` DATETIME NULL AFTER `date`;

-- Modify column
ALTER TABLE `orders` 
MODIFY COLUMN `status` VARCHAR(255) DEFAULT 'Food Processing';

-- Drop column
ALTER TABLE `orders` 
DROP COLUMN `deliveryTime`;

-- ============================================
-- TRUNCATE (clear all data - use with caution)
-- ============================================

-- TRUNCATE TABLE `orders`;






