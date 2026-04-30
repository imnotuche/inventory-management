# Inventory Management System

A full-stack point of sale (POS) and inventory management platform with real-time updates. Enables role-based user management, sales tracking, stock control, and activity logging across distributed team members using WebSocket communication.

---

## Features

- **Role-based Authentication**: Admin and sales user roles with JWT-based session management and single-device session enforcement (prevents simultaneous logins from multiple devices/browsers)
- **Online Status Tracking**: Real-time presence detection with last-seen timestamps, online/offline indicators, and automatic status broadcasts via WebSocket
- **Activity Logging**: Comprehensive file-based audit trail for logins, logouts, staff management, and sales transactions with timestamps
- **Admin Dashboard**: Revenue metrics, daily activity feed, staff performance tracking, and low-stock alerts
- **Sales Dashboard**: Product catalog management, transaction metrics, daily sales history, and instant inventory synchronization
- **Inventory Management**: SKU-based product tracking with batch cost management, quantity monitoring, and average cost price calculation
- **Staff Management**: User creation and deletion (admins only), role assignment, and per-staff performance metrics
- **Real-time Synchronization**: WebSocket-driven updates for metrics, catalog changes, online status, and activity logs across all connected clients

---

## Tech Stack

**Frontend**
- Vue 3, Vite, Vue Router, Pinia (state management), Socket.io-client

**Backend**
- Node.js, Express 5, Socket.io, MongoDB, bcrypt, JWT, CORS, cookie-parser, dotenv

**Database**
- MongoDB (local instance with WiredTiger engine)

---

## Installation & Usage

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or remote instance)
- npm

### Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd inventory-management
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the `server/` directory:
   ```env
   PORT=3000
   FRONTEND_ORIGIN=http://localhost:5173
   MONGODB_URI=mongodb://localhost:27017/inventory
   JWT_SECRET=your-secret-key
   ```

4. **Initialize the database**
   ```bash
   # From server/ directory
   npm start
   ```
   This will seed the database with a default admin account.

5. **Install client dependencies** (in a new terminal)
   ```bash
   cd client
   npm install
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`

### Running the Application

**Terminal 1 - Backend:**
```bash
cd server
npm start
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

**Ensure MongoDB is running** on the configured URI.

### Default Credentials
- **Admin account**: `test` (password: `test`)
- Additional staff accounts can be created by admins through the application

---

## Project Structure

```
inventory-management/
├── client/                    # Vue 3 + Vite frontend application
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── login/         # Authentication interface
│   │   │   ├── dashboard/     # Admin and sales dashboards
│   │   │   ├── addStock/      # Inventory item creation
│   │   │   ├── addStaff/      # User management
│   │   │   ├── stores/        # Pinia state stores (auth, staff, stock, feedback)
│   │   │   └── api.js         # API client utilities
│   │   ├── router.js          # Vue Router configuration
│   │   ├── socket.js          # Socket.io client setup
│   │   └── main.js            # Application entry point
│   └── vite.config.js         # Vite build configuration
│
├── server/                    # Node.js + Express backend
│   ├── modules/
│   │   ├── database.js        # MongoDB operations (CRUD)
│   │   ├── fileStorage.js     # Activity and sales logging
│   │   └── seed.js            # Database initialization
│   ├── routes/
│   │   ├── inventory.js       # Stock management endpoints
│   │   ├── keyMetrics.js      # Analytics and dashboard metrics
│   │   ├── logFetch.js        # Log retrieval endpoints
│   │   └── auth/              # Authentication routes (login, logout, user info)
│   ├── server.js              # Express app and WebSocket setup
│   └── package.json           # Backend dependencies
│
├── files/                     # Data storage directory
│   ├── activity logs/         # System activity and user action logs
│   ├── staff logs/            # Individual staff member activity records
│   └── database/              # MongoDB local data files (WiredTiger)
│
└── README.md                  # This file
```

---

## Key Implementation Details

### Session Management & Single-Device Enforcement
- Only one active session per user across all devices/browsers
- Login attempt fails with `"User active on another device / browser"` if user is already online
- All clients must logout before logging in again from a different device

### Online Presence & Offline Duration Tracking
- Each user has `online` (boolean) and `lastSeen` (timestamp) fields in the database
- Active sessions send heartbeat pings via `/api/auth/ping/{staffId}` to update `lastSeen`
- All connected clients receive `activeStateChange` WebSocket events when online status changes
- Clients can calculate offline duration: `currentTime - lastSeen`

### Activity Logging & Audit Trail
- All actions logged to date-stamped files in `files/activity logs/`
- Activity types tracked: login, logout, staff creation, staff deletion, sales
- Per-staff sales logs stored in `files/staff logs/{staffId}/sales-{date}.log`
- Each log entry includes timestamp, user info, action type, and metadata (staff ID, role, etc.)
- Logs are daily files containing JSON records, one per line

### Staff Deletion
- Only admins can delete other staff members
- Admin must re-authenticate with their password to authorize staff removal
- Deletion is logged to activity logs with admin identity and removed staff info
---
- **MongoDB Community Server** (must be installed locally)

---

## Environment Setup

### Client (`.env` in client folder)

```env
VITE_API_BASE_URL=http://localhost:5000
```
*Replace 5000 if you change the backend port.*

### Server (`.env` in server folder)

```env
DATABASE_NAME=INVENTORY-MANAGEMENT
DATABASE_URI=mongodb://127.0.0.1:4000/
FRONTEND_ORIGIN=http://localhost:5173
JWT_SECRET=8e19d1c79b9e4e76a923467b6a1c3dc4f8434735a8a647ad7f6448e4c0c69c24
PORT=5000
```

---

## Installation & Running

### 1. Install Dependencies

```bash
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```

### 2. Run the Database Server

Make sure MongoDB Community Server is installed locally.
Then, from the server folder, run:

```bash
database-server.bat
```

### 3. Run the Backend

```bash
nodemon server.js
# or
node server.js
```

### 4. Run the Frontend

```bash
cd ../client
npm run dev
```

---

## Notes

- This project does not include update/delete functionality for staff or inventory
- Only admins can add new staff or inventory
- Pre-seeded database includes 2 admins and 5 sales staff
- All account passwords are `1234`
- To view, edit, or remove records (including seeded data), download and use MongoDB Compass or the corresponding VS Code MongoDB extension

---

## Contact

If you encounter issues, reach out on Twitter: [@imnotuche](https://twitter.com/imnotuche)
