# Database Schema Migration Guide

## Overview

The database has been updated to match the ERD schema. This document outlines the changes and how to migrate.

## New Schema Structure

### Tables Created:

1. **Users** (was `users`)
   - `user_id` (PK, was `id`)
   - `user_name` (was `name`)
   - `Email` (was `email`)
   - `Password` (was `password`)
   - `Cart_data` (was `cartData`)
   - `Favorite_item` (NEW - JSON array)

2. **Food_items** (was `foods`)
   - `Food_id` (PK, was `id`)
   - `Food_Name` (was `name`)
   - `Amount` (was `price`)
   - `Category` (was `category`)
   - `description` (kept for compatibility)
   - `image` (kept for compatibility)

3. **Orders** (was `orders`)
   - `Order_id` (PK, was `id`)
   - `User_id` (FK, was `userId`)
   - `Phone_No` (NEW - VARCHAR)
   - `Address` (NEW - VARCHAR)
   - `Status` (ENUM, was string)
   - `Amount` (was `amount`)
   - `Food_id` (FK, NEW)
   - `items` (JSON, kept for backward compatibility)
   - `address` (JSON, kept for backward compatibility)
   - `payment` (BOOLEAN, kept)
   - `date` (DATETIME, kept)

4. **Transactions** (NEW TABLE)
   - `transaction_id` (PK)
   - `Order_id` (FK to Orders)
   - `user_id` (FK to Users)
   - `Datetime` (DATETIME)
   - `Payment_Amount` (DECIMAL)

5. **Track** (NEW TABLE)
   - `Order_id` (PK, FK to Orders)
   - `Order_time` (DATETIME)
   - `Status` (ENUM)
   - `Uodate_time` (DATETIME)
   - `User_id` (FK to Users)

## Migration Steps

### Step 1: Backup Your Data (if needed)

If you have existing data, export it first.

### Step 2: Reset Database

```bash
cd Backend
npm run reset-db
```

Or manually in MySQL Workbench:
1. Run `Backend/database_setup.sql`

### Step 3: Start Server

```bash
npm start
```

Sequelize will automatically create all tables with the new schema.

## Field Name Changes

### Controllers Updated:

- **foodControllers.js**: Uses `Food_Name`, `Amount`, `Category`, `Food_id`
- **userController.js**: Uses `user_name`, `Email`, `Password`, `user_id`, `Cart_data`
- **cartControllers.js**: Uses `Cart_data`, `user_id`
- **orderController.js**: Uses `Order_id`, `User_id`, `Status`, `Amount`, `Food_id`

### Backward Compatibility:

- Controllers transform data to match frontend expectations
- Food items return `_id`, `name`, `price`, `category` for frontend
- Orders return `_id`, `userId` for frontend
- JSON fields (`items`, `address`) maintained for multiple items per order

## Important Notes

1. **Foreign Keys**: All foreign key relationships are set up with CASCADE or SET NULL
2. **ENUM Values**: Status fields use ENUM for data integrity
3. **JSON Fields**: `Cart_data`, `Favorite_item`, `items`, `address` use JSON type
4. **Timestamps**: Disabled in models (using custom date fields instead)

## Testing

After migration:
1. Test user registration/login
2. Test adding food items
3. Test cart functionality
4. Test order placement
5. Test order status updates

## Rollback

If you need to rollback:
1. Restore from backup
2. Or modify models back to old field names
3. Update controllers accordingly

