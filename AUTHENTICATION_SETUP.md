# 🔐 Kuyash Farm - Enterprise Authentication System

## Overview

A professional, enterprise-grade authentication system has been implemented for the Kuyash Farm e-commerce platform. The system features a **fully organized backend** built with TypeScript, Express, Prisma, and JWT authentication, connected to a **modern React/Next.js frontend** with Context API.

---

## 🏗️ Architecture

### Backend Structure
```
backend/
├── src/
│   ├── config/              # Configuration & environment
│   │   ├── index.ts         # Centralized config management
│   │   └── database.ts      # Prisma client & DB connection
│   │
│   ├── controllers/         # Request handlers
│   │   └── auth.controller.ts
│   │
│   ├── services/            # Business logic layer
│   │   └── auth.service.ts  # Auth operations (register, login, etc.)
│   │
│   ├── middlewares/         # Express middleware
│   │   ├── auth.middleware.ts      # JWT verification & protection
│   │   ├── validation.middleware.ts # Request validation
│   │   └── error.middleware.ts     # Global error handling
│   │
│   ├── routes/              # API routes
│   │   ├── auth.routes.ts
│   │   └── index.ts         # Routes aggregator
│   │
│   ├── validators/          # Request validation rules
│   │   └── auth.validator.ts
│   │
│   ├── utils/               # Utility functions
│   │   ├── jwt.ts           # JWT token generation & verification
│   │   ├── password.ts      # Password hashing & validation
│   │   ├── logger.ts        # Winston logger
│   │   └── apiResponse.ts   # Standardized API responses
│   │
│   ├── types/               # TypeScript definitions
│   │   └── express.d.ts     # Extended Express types
│   │
│   ├── app.ts               # Express app configuration
│   └── server.ts            # Server entry point
│
├── prisma/
│   └── schema.prisma        # Database schema (MongoDB/PostgreSQL)
│
├── .env                     # Environment variables
└── tsconfig.json            # TypeScript configuration
```

### Frontend Structure
```
frontend/
├── lib/
│   ├── api/                 # API client & methods
│   │   ├── client.ts        # HTTP client with auto token refresh
│   │   └── auth.ts          # Authentication API methods
│   │
│   └── context/             # React Context
│       └── AuthContext.tsx  # Authentication state management
│
└── app/
    ├── login/               # Login page
    ├── register/            # Registration page
    └── layout.tsx           # Root layout with AuthProvider
```

---

## 🚀 Features

### Backend Features
- ✅ **JWT Authentication** with access & refresh tokens
- ✅ **Role-Based Access Control** (USER, ADMIN, SUPER_ADMIN)
- ✅ **User Type Management** (RETAIL, WHOLESALE, DISTRIBUTOR)
- ✅ **Password Security** with bcrypt hashing
- ✅ **Token Rotation** for enhanced security
- ✅ **Rate Limiting** to prevent abuse
- ✅ **Request Validation** with express-validator
- ✅ **Comprehensive Error Handling**
- ✅ **Professional Logging** with Winston
- ✅ **CORS Configuration**
- ✅ **Security Headers** with Helmet
- ✅ **HTTP-Only Cookies** for refresh tokens

### Frontend Features
- ✅ **Authentication Context** with React Context API
- ✅ **Auto Token Refresh** on 401 errors
- ✅ **Protected Routes** support
- ✅ **Login & Register Pages** with modern UI
- ✅ **Form Validation**
- ✅ **Error Handling & Display**
- ✅ **Loading States**
- ✅ **Backward Compatibility** with localStorage

---

## 📊 Database Schema

The Prisma schema supports both **MongoDB** and **PostgreSQL** and includes:

- **Users** - User accounts with authentication
- **BusinessInfo** - Business details for wholesale users
- **DistributorInfo** - Distributor-specific information
- **WholesaleApplication** - Wholesale upgrade requests
- **DistributorApplication** - Distributor partnership applications
- **Products** - Product catalog with pricing
- **BulkPricing** - Tiered pricing for bulk orders
- **Orders** - Order management
- **OrderItems** - Order line items
- **ShippingAddress** - Delivery addresses
- **Tracking** - Order tracking info
- **RestockHistory** - Inventory restock logs
- **RestockSubscription** - "Notify Me" subscriptions

---

## 🔑 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/v1/auth/register` | Register new user | No |
| POST | `/api/v1/auth/login` | Login user | No |
| POST | `/api/v1/auth/logout` | Logout user | Yes |
| POST | `/api/v1/auth/refresh` | Refresh access token | No (needs refresh token) |
| GET | `/api/v1/auth/me` | Get current user profile | Yes |
| PUT | `/api/v1/auth/me` | Update user profile | Yes |
| PUT | `/api/v1/auth/change-password` | Change password | Yes |

### Health Check
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/health` | API health status |

---

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+
- MongoDB (or PostgreSQL)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   - Copy `.env.example` to `.env`
   - Update `DATABASE_URL` with your MongoDB/PostgreSQL connection string
   - Change JWT secrets for production

4. **Generate Prisma client:**
   ```bash
   npm run prisma:generate
   ```

5. **Run database migrations:**
   ```bash
   npm run migrate
   ```

6. **Start development server:**
   ```bash
   npm run dev
   ```

   Server runs at: `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   - Copy `.env.local.example` to `.env.local`
   - Update `NEXT_PUBLIC_API_URL` if backend runs on different port

4. **Start development server:**
   ```bash
   npm run dev
   ```

   App runs at: `http://localhost:3000`

---

## 🧪 Testing the System

### 1. Register a New User
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "Password@123",
    "name": "John Doe",
    "phone": "+2348012345678"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "Password@123"
  }'
```

### 3. Get Profile (with token)
```bash
curl -X GET http://localhost:5000/api/v1/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### 4. Using the Frontend
1. Visit `http://localhost:3000/register`
2. Create an account with:
   - Valid email
   - Password meeting requirements (8+ chars, upper, lower, number, special char)
   - Name and optional phone
3. Login at `http://localhost:3000/login`
4. Access protected routes (admin panel, profile, etc.)

---

## 🔒 Security Best Practices

1. **JWT Secrets**: Change default secrets in production
2. **HTTPS**: Use HTTPS in production
3. **Environment Variables**: Never commit `.env` files
4. **Rate Limiting**: Configured to prevent brute force attacks
5. **Password Policy**: Strong password requirements enforced
6. **HTTP-Only Cookies**: Refresh tokens stored securely
7. **CORS**: Restricted to frontend origin
8. **Helmet**: Security headers applied
9. **Input Validation**: All inputs validated before processing

---

## 📝 Password Requirements

- Minimum 8 characters
- At least one uppercase letter (A-Z)
- At least one lowercase letter (a-z)
- At least one number (0-9)
- At least one special character (@$!%*?&#, etc.)

---

## 🔄 Token Management

### Access Token
- **Lifetime**: 15 minutes
- **Storage**: Frontend localStorage
- **Usage**: Authorization header for API requests
- **Format**: `Bearer <token>`

### Refresh Token
- **Lifetime**: 7 days
- **Storage**: HTTP-only cookie
- **Usage**: Automatic token refresh on 401 errors
- **Security**: Not accessible via JavaScript

---

## 🎨 Frontend Integration

### Using Authentication Context

```tsx
import { useAuth } from '@/lib/context/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();

  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  return (
    <div>
      <p>Welcome, {user.name}!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Protected Route Example

```tsx
'use client';

import { useAuth } from '@/lib/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <div>Protected content</div>;
}
```

---

## 📦 Production Deployment

### Backend
1. Set `NODE_ENV=production`
2. Use strong JWT secrets
3. Configure production database
4. Enable HTTPS
5. Set up proper CORS origins
6. Configure email service for notifications
7. Use process manager (PM2, Docker)

### Frontend
1. Build for production: `npm run build`
2. Set production API URL
3. Enable HTTPS
4. Configure CDN for static assets
5. Set up monitoring

---

## 🚀 Next Steps

### Immediate
- [ ] Set up MongoDB or PostgreSQL database
- [ ] Install backend dependencies
- [ ] Run Prisma migrations
- [ ] Test authentication flow

### Future Enhancements
- [ ] Email verification
- [ ] Password reset functionality
- [ ] Social authentication (Google, Facebook)
- [ ] Two-factor authentication (2FA)
- [ ] User profile management pages
- [ ] Admin dashboard for user management
- [ ] Audit logging
- [ ] Session management
- [ ] Rate limiting per user

---

## 📖 Additional Resources

- **Prisma Docs**: https://www.prisma.io/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Express.js**: https://expressjs.com
- **JWT**: https://jwt.io
- **Winston Logger**: https://github.com/winstonjs/winston

---

## 🐛 Troubleshooting

### Database Connection Issues
- Verify MongoDB/PostgreSQL is running
- Check `DATABASE_URL` in `.env`
- Run `npm run prisma:generate`

### CORS Errors
- Verify `CORS_ORIGIN` matches frontend URL
- Check frontend `.env.local` has correct API URL

### Token Refresh Issues
- Ensure cookies are enabled
- Check browser allows credentials
- Verify `credentials: 'include'` in fetch requests

---

## 👥 Support

For issues or questions:
1. Check this documentation
2. Review code comments
3. Check logs in `backend/logs/`
4. Consult API responses for error details

---

**Built with ❤️ for Kuyash Farm**
