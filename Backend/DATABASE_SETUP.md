# Database Setup Guide

This guide will help you delete the old database and set up a new MySQL database connected to MySQL Workbench.

## Prerequisites

- MySQL Server installed and running
- MySQL Workbench installed
- Node.js and npm installed

## Method 1: Using the Reset Script (Recommended)

### Step 1: Create .env file

Create a `.env` file in the `Backend` folder (copy from `.env.example`):

```env
DB_HOST=localhost
DB_USER=root
DB_PASS=your_mysql_password
DB_NAME=foodDeliveryApp
DB_DIALECT=mysql
```

**Important:** Replace `your_mysql_password` with your actual MySQL root password.

### Step 2: Run the reset script

```bash
cd Backend
node scripts/resetDatabase.js
```

This will:
- Drop the existing `foodDeliveryApp` database
- Create a new empty `foodDeliveryApp` database

### Step 3: Start the server

```bash
npm start
```

Sequelize will automatically create all tables (foods, users, orders) when the server starts.

---

## Method 2: Using MySQL Workbench (Manual)

### Step 1: Open MySQL Workbench

1. Launch MySQL Workbench
2. Connect to your MySQL server (usually `localhost:3306`)
3. Enter your MySQL root password

### Step 2: Run the SQL script

1. In MySQL Workbench, go to **File → Open SQL Script**
2. Navigate to `Backend/database_setup.sql`
3. Click **Execute** (or press `Ctrl+Shift+Enter`)

This will:
- Drop the old database
- Create a new `foodDeliveryApp` database
- Create all necessary tables

### Step 3: Verify the database

1. In MySQL Workbench, refresh the Schemas panel (right-click → Refresh All)
2. You should see `foodDeliveryApp` database with three tables:
   - `foods`
   - `users`
   - `orders`

### Step 4: Update .env file

Make sure your `.env` file has the correct database credentials:

```env
DB_HOST=localhost
DB_USER=root
DB_PASS=your_mysql_password
DB_NAME=foodDeliveryApp
DB_DIALECT=mysql
```

### Step 5: Start the server

```bash
cd Backend
npm start
```

---

## Connecting to MySQL Workbench

### Connection Settings:

- **Connection Name:** Rasoi Database (or any name you prefer)
- **Hostname:** `localhost` (or `127.0.0.1`)
- **Port:** `3306` (default MySQL port)
- **Username:** `root` (or your MySQL username)
- **Password:** Your MySQL root password
- **Default Schema:** `foodDeliveryApp`

### Steps to Connect:

1. Open MySQL Workbench
2. Click the **+** icon next to "MySQL Connections"
3. Enter the connection details above
4. Click **Test Connection** to verify
5. Click **OK** to save
6. Double-click the connection to connect

---

## Troubleshooting

### Error: "Access denied for user"

- Check your MySQL password in the `.env` file
- Make sure MySQL server is running
- Verify your MySQL user has proper permissions

### Error: "Unknown database"

- The database doesn't exist yet - run the reset script or SQL script first
- Check that `DB_NAME` in `.env` matches the database name

### Error: "Can't connect to MySQL server"

- Make sure MySQL Server is running
- Check if MySQL is running on port 3306
- Verify firewall settings allow connections

### Tables not created automatically

- Make sure all models are imported in `server.js` or a models index file
- Check that `sequelize.sync()` is called in `config/db.js`
- Look for errors in the console output

---

## Database Structure

### Tables:

1. **foods** - Stores food items
   - id, name, description, price, image, category

2. **users** - Stores user accounts
   - id, email, name, password, cartData

3. **orders** - Stores orders
   - id, userId, items, amount, address, status, date, payment

---

## Next Steps

After setting up the database:

1. ✅ Database is created and connected
2. ✅ Tables are created automatically by Sequelize
3. 📝 Add food items through the Admin panel
4. 👤 Register users through the frontend
5. 🛒 Test cart and order functionality

---

## Notes

- The database will be automatically synced when you start the server
- Sequelize will create tables if they don't exist
- All timestamps (`createdAt`, `updatedAt`) are managed automatically
- Foreign key constraints are set up for data integrity

