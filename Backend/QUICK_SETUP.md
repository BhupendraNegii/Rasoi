# Quick Database Setup

## 🚀 Fast Setup (Using Script)

### 1. Create `.env` file in `Backend` folder:

```env
DB_HOST=localhost
DB_USER=root
DB_PASS=your_mysql_password_here
DB_NAME=foodDeliveryApp
DB_DIALECT=mysql
```

**Replace `your_mysql_password_here` with your actual MySQL password.**

### 2. Reset Database:

```bash
cd Backend
npm run reset-db
```

### 3. Start Server (tables will be created automatically):

```bash
npm start
```

---

## 📊 Connect to MySQL Workbench

### Connection Details:

1. Open MySQL Workbench
2. Click **+** to add new connection
3. Enter:
   - **Connection Name:** Rasoi Database
   - **Hostname:** `localhost`
   - **Port:** `3306`
   - **Username:** `root`
   - **Password:** Your MySQL password
   - **Default Schema:** `foodDeliveryApp`
4. Click **Test Connection**
5. Click **OK** to save
6. Double-click to connect

---

## 🔧 Manual Setup (Using MySQL Workbench)

1. Open MySQL Workbench
2. Connect to your MySQL server
3. Go to **File → Open SQL Script**
4. Select `Backend/database_setup.sql`
5. Click **Execute** (Ctrl+Shift+Enter)
6. Refresh Schemas panel to see `foodDeliveryApp` database

---

## ✅ Verify Setup

After starting the server, you should see:
- `Database connected ✅` in console
- Three tables created: `foods`, `users`, `orders`

In MySQL Workbench:
- Expand `foodDeliveryApp` database
- You should see all three tables

---

## 📝 Next Steps

1. Add food items via Admin panel
2. Test user registration
3. Test cart functionality
4. Test order placement

