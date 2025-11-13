-- ============================================
-- Orders Table Schema
-- Database: foodDeliveryApp (or your database name)
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
-- Column Descriptions:
-- ============================================
-- id: Primary key, auto-incrementing integer
-- userId: Foreign key reference to users table (INTEGER)
-- items: JSON array containing order items with name, price, quantity
-- amount: Total order amount (FLOAT)
-- address: JSON object containing delivery address details
-- status: Order status (default: 'Food Processing')
-- date: Order creation date (default: current timestamp)
-- payment: Payment status (default: FALSE)
-- createdAt: Record creation timestamp (auto-managed by Sequelize)
-- updatedAt: Record update timestamp (auto-managed by Sequelize)
-- ============================================






