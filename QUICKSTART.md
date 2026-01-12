# 🚀 Kuyash Farm - Quick Start Guide

## Prerequisites
- Node.js 18+ installed
- MongoDB installed and running (or PostgreSQL)
- npm or yarn

---

## ⚡ Quick Setup (5 minutes)

### Step 1: Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies (in a new terminal)
cd frontend
npm install
```

### Step 2: Set Up Database

#### Option A: MongoDB (Recommended for Development)

1. **Install MongoDB:**
   - macOS: `brew install mongodb-community`
   - Ubuntu: `sudo apt install mongodb`
   - Windows: Download from mongodb.com

2. **Start MongoDB:**
   ```bash
   # macOS
   brew services start mongodb-community

   # Linux
   sudo systemctl start mongod

   # Windows
   # Start MongoDB service from Services app
   ```

3. **Database URL is already configured in `backend/.env`:**
   ```
   DATABASE_URL="mongodb://localhost:27017/kuyashfarm"
   ```

#### Option B: PostgreSQL

1. **Install PostgreSQL**
2. **Create database:**
   ```bash
   createdb kuyashfarm
   ```

3. **Update `backend/.env`:**
   ```
   DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/kuyashfarm?schema=public"
   ```

4. **Update `backend/prisma/schema.prisma`:**
   ```prisma
   datasource db {
     provider = "postgresql"  // Change from "mongodb"
     url      = env("DATABASE_URL")
   }
   ```

### Step 3: Initialize Database

```bash
cd backend

# Generate Prisma client
npm run prisma:generate

# Run migrations (creates tables/collections)
npm run migrate
```

### Step 4: Start Servers

#### Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

You should see:
```
╔═══════════════════════════════════════════════════╗
║   🌾 Kuyash Farm API Server                      ║
║   Environment: development                         ║
║   Port: 5000                                       ║
║   🚀 Server is running!                          ║
║   📡 API: http://localhost:5000/api/v1           ║
╚═══════════════════════════════════════════════════╝
```

#### Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

Visit: **http://localhost:3000**

---

## 🧪 Test the Setup

### 1. Test Backend Health

Visit: http://localhost:5000/api/v1/health

Should return:
```json
{
  "success": true,
  "message": "Kuyash Farm API is running",
  "timestamp": "2024-01-12T..."
}
```

### 2. Create Your First User

1. Visit: http://localhost:3000/register
2. Fill in the form:
   - **Name:** Your Name
   - **Email:** your@email.com
   - **Password:** Password@123 (must meet requirements)
   - **Confirm Password:** Password@123

3. Click "Create Account"
4. You'll be redirected to home page, now logged in!

### 3. Test Login

1. Logout (use browser console: `localStorage.clear()` then refresh)
2. Visit: http://localhost:3000/login
3. Login with your credentials
4. Success!

---

## 🎯 What You Get

### Backend Running on http://localhost:5000
- ✅ RESTful API with JWT authentication
- ✅ Secure password hashing
- ✅ Role-based access control
- ✅ Token refresh mechanism
- ✅ Request validation
- ✅ Error handling
- ✅ Logging system

### Frontend Running on http://localhost:3000
- ✅ Modern Next.js 16 app
- ✅ Authentication context
- ✅ Login/Register pages
- ✅ Protected routes support
- ✅ Auto token refresh
- ✅ Responsive design

---

## 📁 Project Structure

```
kuyashfarm/
├── backend/                 # Express + TypeScript API
│   ├── src/
│   │   ├── config/         # Configuration
│   │   ├── controllers/    # Request handlers
│   │   ├── services/       # Business logic
│   │   ├── middlewares/    # Express middleware
│   │   ├── routes/         # API routes
│   │   ├── validators/     # Input validation
│   │   ├── utils/          # Utilities (JWT, password, etc.)
│   │   └── server.ts       # Entry point
│   ├── prisma/
│   │   └── schema.prisma   # Database schema
│   └── .env                # Environment variables
│
└── frontend/               # Next.js 16 app
    ├── app/
    │   ├── login/          # Login page
    │   ├── register/       # Register page
    │   └── layout.tsx      # Root layout with AuthProvider
    └── lib/
        ├── api/            # API client
        └── context/        # Auth context
```

---

## 🔧 Common Issues & Solutions

### Issue: "Port 5000 already in use"
**Solution:** Change port in `backend/.env`:
```env
PORT=5001
```
And update `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api/v1
```

### Issue: Database connection error
**Solution:**
- Ensure MongoDB/PostgreSQL is running
- Check `DATABASE_URL` in `backend/.env`
- Run `npm run prisma:generate`

### Issue: CORS errors
**Solution:**
- Verify frontend runs on `http://localhost:3000`
- Check `CORS_ORIGIN` in `backend/.env` matches frontend URL

### Issue: "Module not found" errors
**Solution:**
```bash
# Backend
cd backend
npm install
npm run prisma:generate

# Frontend
cd frontend
npm install
```

---

## 🎓 Next Steps

### For Development:
1. ✅ Read [AUTHENTICATION_SETUP.md](./AUTHENTICATION_SETUP.md) for detailed docs
2. ✅ Explore API endpoints at http://localhost:5000/api/v1/
3. ✅ Check Prisma Studio: `cd backend && npm run prisma:studio`
4. ✅ Review backend logs in `backend/logs/`

### Build Features:
- [ ] Add protected routes in frontend
- [ ] Integrate wholesale application flow
- [ ] Connect admin panel to real backend
- [ ] Implement product management APIs
- [ ] Add order processing
- [ ] Build distributor management

### Production Readiness:
- [ ] Change JWT secrets in `.env`
- [ ] Set up production database
- [ ] Configure email service
- [ ] Add SSL certificates
- [ ] Set up monitoring
- [ ] Deploy to cloud provider

---

## 📚 Available Scripts

### Backend
```bash
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm run start        # Start production server
npm run migrate      # Run database migrations
npm run prisma:generate  # Generate Prisma client
npm run prisma:studio    # Open Prisma Studio (DB GUI)
```

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

---

## 🐛 Debugging Tips

### View Backend Logs:
```bash
tail -f backend/logs/combined.log
tail -f backend/logs/error.log
```

### View Database:
```bash
cd backend
npm run prisma:studio
```
Opens GUI at http://localhost:5555

### Test API with curl:
```bash
# Register
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"Test@123","name":"Test User"}'

# Login
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"Test@123"}'
```

---

## 🎨 Default Admin Account

After first migration, you can create an admin user manually:

```bash
# In Prisma Studio or your MongoDB client
# Set user.role = "ADMIN" or "SUPER_ADMIN"
```

Or use the register API and update the database.

---

## 📞 Need Help?

1. Check [AUTHENTICATION_SETUP.md](./AUTHENTICATION_SETUP.md) for detailed info
2. Review code comments
3. Check logs in `backend/logs/`
4. Inspect browser console for frontend errors
5. Use Prisma Studio to inspect database

---

## ✅ Success Checklist

- [ ] MongoDB/PostgreSQL running
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] Prisma client generated
- [ ] Database migrated
- [ ] Backend server running on port 5000
- [ ] Frontend running on port 3000
- [ ] Health check returns success
- [ ] User registration works
- [ ] User login works
- [ ] Protected routes work

---

**You're all set! Happy coding! 🎉**

For detailed documentation, see [AUTHENTICATION_SETUP.md](./AUTHENTICATION_SETUP.md)
