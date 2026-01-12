# 🍃 Kuyash Farm - MongoDB + Mongoose Authentication System

## Overview

Professional authentication system built with **MongoDB** and **Mongoose** for the Kuyash Farm e-commerce platform.

## 🏗️ Technology Stack

- **Database**: MongoDB
- **ODM**: Mongoose 8.x
- **Backend**: TypeScript + Express.js
- **Authentication**: JWT (JSON Web Tokens)
- **Password Security**: bcrypt
- **Validation**: express-validator

---

## 🚀 Quick Setup (5 Minutes)

### Step 1: Install MongoDB

#### macOS:
```bash
brew tap mongodb/brew
brew install mongodb-community
```

#### Ubuntu/Linux:
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
```

#### Windows:
Download from: https://www.mongodb.com/try/download/community

### Step 2: Start MongoDB

#### macOS:
```bash
brew services start mongodb-community
```

#### Linux:
```bash
sudo systemctl start mongod
sudo systemctl enable mongod
```

#### Windows:
Start MongoDB service from Services app

### Step 3: Verify MongoDB is Running

```bash
mongosh
# Should connect successfully

# Then type:
show dbs
exit
```

### Step 4: Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### Step 5: Configure Environment

The `.env` file is already configured with MongoDB connection:

```env
DATABASE_URL="mongodb://localhost:27017/kuyashfarm"
```

### Step 6: Start Development Servers

#### Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

#### Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

---

## 📊 Database Structure

### User Schema (Mongoose)

```typescript
{
  email: String (unique, required, indexed)
  password: String (hashed, required, hidden)
  name: String
  phone: String
  userType: Enum [
    RETAIL,
    WHOLESALE_PENDING,
    WHOLESALE_VERIFIED,
    DISTRIBUTOR_PENDING,
    DISTRIBUTOR_VERIFIED
  ]
  role: Enum [USER, ADMIN, SUPER_ADMIN]
  isEmailVerified: Boolean (default: false)
  isActive: Boolean (default: true)
  refreshToken: String (hidden)
  emailVerifyToken: String (hidden)
  resetPasswordToken: String (hidden)
  resetPasswordExpires: Date (hidden)
  createdAt: Date (auto)
  updatedAt: Date (auto)
}
```

### Indexes for Performance:
- email (unique)
- userType
- role
- createdAt (descending)

---

## 🛠️ Working with MongoDB

### View Your Database

**Option 1: MongoDB Compass (GUI)**
1. Download: https://www.mongodb.com/products/tools/compass
2. Connect to: `mongodb://localhost:27017`
3. Browse the `kuyashfarm` database

**Option 2: mongosh (CLI)**
```bash
mongosh

use kuyashfarm
db.users.find().pretty()
db.users.countDocuments()
```

###Common MongoDB Commands

```bash
# Show all databases
show dbs

# Use kuyashfarm database
use kuyashfarm

# Show all collections
show collections

# Find all users
db.users.find().pretty()

# Find specific user
db.users.findOne({ email: "user@example.com" })

# Count users
db.users.countDocuments()

# Find users by role
db.users.find({ role: "ADMIN" })

# Update user to admin
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "ADMIN" } }
)

# Delete a user
db.users.deleteOne({ email: "test@example.com" })

# Drop entire users collection (careful!)
db.users.drop()
```

---

## 🔧 Development Tips

### Create Admin User

1. **Register a regular user first** at http://localhost:3000/register

2. **Upgrade to admin using mongosh:**
```bash
mongosh
use kuyashfarm
db.users.updateOne(
  { email: "youremail@example.com" },
  { $set: { role: "ADMIN" } }
)
```

3. **Verify:**
```bash
db.users.findOne({ email: "youremail@example.com" }, { role: 1, email: 1 })
```

### Reset Database

```bash
mongosh
use kuyashfarm
db.dropDatabase()
```

### Backup Database

```bash
mongodump --db=kuyashfarm --out=/path/to/backup
```

### Restore Database

```bash
mongorestore --db=kuyashfarm /path/to/backup/kuyashfarm
```

---

## 📝 Mongoose Features Used

### Schema Validation
- Required fields
- Unique constraints
- Enum validation
- Custom validators

### Middleware Hooks
- Pre-save hooks for password hashing (optional)
- Post-save hooks for logging (optional)

### Virtual Properties
- Hide sensitive fields by default (`select: false`)
- Transform output with `toJSON`

### Query Helpers
- Select specific fields
- Populate references (for future relations)
- Lean queries for performance

---

## 🔒 Security Features

✅ **Password Security**
- bcrypt hashing with salt rounds = 12
- Passwords never returned in API responses
- Password field marked as `select: false`

✅ **JWT Tokens**
- Access token: 15 minutes
- Refresh token: 7 days (stored in DB)
- HTTP-only cookies for refresh tokens

✅ **Data Protection**
- Email lowercase normalization
- Input validation before DB operations
- MongoDB injection prevention (Mongoose built-in)

✅ **Performance**
- Indexes on frequently queried fields
- Connection pooling (maxPoolSize: 10)
- Lean queries where appropriate

---

## 🧪 Testing

### Test User Registration

```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test@123456",
    "name": "Test User"
  }'
```

### Test User Login

```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test@123456"
  }'
```

### Test Protected Route

```bash
# Save the accessToken from login response, then:
curl -X GET http://localhost:5000/api/v1/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## 🔄 Mongoose vs Prisma

### Why Mongoose for this project:

✅ **Native MongoDB features** - Full access to MongoDB capabilities
✅ **Flexible schema** - Easy to modify and extend
✅ **Middleware hooks** - Pre/post save hooks for complex logic
✅ **Virtual properties** - Computed fields and transforms
✅ **No migrations needed** - Schema changes are instant
✅ **Mature ecosystem** - 10+ years of development
✅ **Better for rapid prototyping** - Less setup overhead

---

## 📦 Production Deployment

### MongoDB Atlas (Recommended)

1. **Create free cluster**: https://www.mongodb.com/cloud/atlas
2. **Get connection string**
3. **Update `.env`:**
```env
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/kuyashfarm?retryWrites=true&w=majority"
```

### Security Checklist

- [ ] Change JWT secrets
- [ ] Use MongoDB Atlas or secured MongoDB server
- [ ] Enable MongoDB authentication
- [ ] Use SSL/TLS connections
- [ ] Implement rate limiting
- [ ] Add request logging
- [ ] Set up monitoring
- [ ] Configure backup strategy

---

## 🐛 Troubleshooting

### "MongoServerError: connect ECONNREFUSED"
**Solution:** MongoDB is not running
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### "MongooseError: Operation `users.findOne()` buffering timed out"
**Solution:** Check DATABASE_URL in `.env`
```env
DATABASE_URL="mongodb://localhost:27017/kuyashfarm"
```

### Cannot connect to MongoDB
**Solution:** Verify MongoDB is listening
```bash
netstat -an | grep 27017
# Should show: tcp4  0  0  127.0.0.1.27017  *.*  LISTEN
```

### "Duplicate key error"
**Solution:** Email already exists. Use different email or drop collection:
```bash
mongosh
use kuyashfarm
db.users.drop()
```

---

## 📚 Additional Resources

- **Mongoose Docs**: https://mongoosejs.com/docs/guide.html
- **MongoDB Manual**: https://www.mongodb.com/docs/manual/
- **MongoDB University**: https://learn.mongodb.com/ (Free courses!)
- **Mongoose TypeScript**: https://mongoosejs.com/docs/typescript.html

---

## ✅ Setup Checklist

- [ ] MongoDB installed
- [ ] MongoDB running
- [ ] Can connect with `mongosh`
- [ ] Backend dependencies installed (`npm install`)
- [ ] Frontend dependencies installed (`npm install`)
- [ ] `.env` configured
- [ ] Backend running (`npm run dev`)
- [ ] Frontend running (`npm run dev`)
- [ ] Can register a user
- [ ] Can login
- [ ] Can access protected routes

---

## 🎯 Next Steps

1. **Test the system** - Register/login through frontend
2. **Create admin user** - Use mongosh to upgrade a user
3. **Explore MongoDB Compass** - Visual database browser
4. **Add more models** - Products, Orders, etc.
5. **Implement features** - Build on this solid foundation!

---

**Built with ❤️ for Kuyash Farm using MongoDB + Mongoose**
