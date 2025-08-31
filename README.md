# Cashier System

Sistem kasir modern dengan React frontend dan Node.js backend.

## 🚀 Fitur

- **Authentication** - Login dengan role admin dan cashier
- **Product Management** - CRUD produk dengan stok
- **Shopping Cart** - Keranjang belanja real-time
- **Transaction History** - Riwayat transaksi lengkap
- **Responsive Design** - UI modern dan responsif

## 🛠️ Tech Stack

### Backend
- Node.js + Express
- TypeScript
- PostgreSQL + Sequelize
- JWT Authentication
- bcrypt (password hashing)

### Frontend
- React + TypeScript
- Tailwind CSS
- Zustand (state management)

## 📁 Struktur Project

```
cashier/
├── backend/          # Server API
│   ├── src/
│   │   ├── controllers/  # Business logic
│   │   ├── models/       # Database models
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Auth middleware
│   │   └── config/       # Database config
│   └── package.json
├── frontend/         # React app
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── pages/        # Page components
│   │   ├── stores/       # State management
│   │   └── services/     # API services
│   └── package.json
└── README.md
```

## 🚀 Instalasi

### Prerequisites
- Node.js (v16+)
- PostgreSQL
- npm atau yarn

### 1. Clone Repository
```bash
git clone <repository-url>
cd cashier
```

### 2. Setup Database
```bash
# Masuk ke PostgreSQL
psql -U postgres

# Buat database
CREATE DATABASE cashier_db;

# Keluar
\q
```

### 3. Setup Backend
```bash
cd backend

# Install dependencies
npm install

# Copy environment file
cp env.example .env

# Edit .env file dengan konfigurasi database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=cashier_db
DB_USER=postgres
DB_PASSWORD=your_password

# Jalankan server
npm start
```

### 4. Setup Frontend
```bash
cd frontend

# Install dependencies
npm install

# Jalankan development server
npm start
```

## 🔐 Default Login

Setelah backend berjalan, user default akan dibuat otomatis:

**Admin:**
- Username: `admin`
- Password: `admin123`

**Cashier:**
- Username: `cashier1`
- Password: `password`

## 📋 API Endpoints

### Authentication
- `POST /api/auth/login` - Login user
- `POST /api/auth/register` - Register user
- `GET /api/auth/profile` - Get user profile

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Transactions
- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create transaction

## 🎨 UI/UX Features

- **Modern Design** - Clean dan minimalis
- **Blue & White Theme** - Professional color scheme
- **Responsive Layout** - Works on all devices
- **Intuitive Navigation** - Easy to use interface

## 🔧 Development

### Backend Development
```bash
cd backend
npm run dev  # Development mode dengan nodemon
```

### Frontend Development
```bash
cd frontend
npm start    # Development server di port 3000
```

### Database Migrations
```bash
# Tabel akan dibuat otomatis saat pertama kali menjalankan backend
npm start
```

## 📝 Environment Variables

### Backend (.env)
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=cashier_db
DB_USER=postgres
DB_PASSWORD=your_password
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key
```

## 🚀 Deployment

### Backend Deployment
1. Build project: `npm run build`
2. Set environment variables
3. Deploy ke server (Heroku, Vercel, dll)

### Frontend Deployment
1. Build project: `npm run build`
2. Deploy build folder ke hosting

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Cashier System - Modern Point of Sale Solution