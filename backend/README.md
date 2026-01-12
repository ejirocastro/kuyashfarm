# Kuyash Farm - Backend API

Enterprise-grade RESTful API built with TypeScript, Express, Prisma, and JWT authentication.

## Tech Stack

- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MongoDB (or PostgreSQL)
- **ORM:** Prisma
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** express-validator
- **Logging:** Winston
- **Security:** Helmet, bcryptjs, CORS, Rate Limiting

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run migrate

# Start development server
npm run dev
```

Server runs at: **http://localhost:5000**

## Project Structure

```
src/
├── config/              # Configuration & DB connection
│   ├── index.ts         # Environment config
│   └── database.ts      # Prisma client
│
├── controllers/         # Request handlers (thin layer)
│   └── auth.controller.ts
│
├── services/            # Business logic (main logic here)
│   └── auth.service.ts
│
├── middlewares/         # Express middleware
│   ├── auth.middleware.ts       # JWT verification
│   ├── validation.middleware.ts # Request validation
│   └── error.middleware.ts      # Error handling
│
├── routes/              # API routes
│   ├── auth.routes.ts
│   └── index.ts
│
├── validators/          # Validation rules
│   └── auth.validator.ts
│
├── utils/               # Utilities
│   ├── jwt.ts           # Token management
│   ├── password.ts      # Password hashing
│   ├── logger.ts        # Winston logger
│   └── apiResponse.ts   # Response formatter
│
├── types/               # TypeScript definitions
│   └── express.d.ts
│
├── app.ts               # Express app setup
└── server.ts            # Server entry point
```

## Architecture Principles

### 🎯 **Separation of Concerns**
- **Controllers:** Handle HTTP requests/responses only
- **Services:** Contain all business logic
- **Middlewares:** Handle cross-cutting concerns
- **Validators:** Validate input data
- **Utils:** Reusable helper functions

### 📦 **Modular Design**
Each module (auth, products, orders) will have:
- Controller (handles requests)
- Service (business logic)
- Routes (endpoint definitions)
- Validators (input validation)

### 🔒 **Security First**
- JWT with access & refresh tokens
- Password hashing with bcrypt
- HTTP-only cookies for refresh tokens
- Rate limiting
- CORS configuration
- Security headers with Helmet
- Input validation on all endpoints

## Available Scripts

```bash
npm run dev              # Start development server with hot reload
npm run build            # Compile TypeScript to JavaScript
npm run start            # Run production build
npm run lint             # Run ESLint
npm run migrate          # Run Prisma migrations
npm run migrate:deploy   # Deploy migrations (production)
npm run prisma:generate  # Generate Prisma client
npm run prisma:studio    # Open Prisma Studio (DB GUI)
npm run seed             # Seed database with initial data
npm test                 # Run tests
```

## API Endpoints

### Authentication
```
POST   /api/v1/auth/register         Register new user
POST   /api/v1/auth/login            Login user
POST   /api/v1/auth/logout           Logout user (protected)
POST   /api/v1/auth/refresh          Refresh access token
GET    /api/v1/auth/me               Get current user (protected)
PUT    /api/v1/auth/me               Update profile (protected)
PUT    /api/v1/auth/change-password  Change password (protected)
```

### Health Check
```
GET    /api/v1/health                API health status
```

## Environment Variables

See `.env.example` for all available environment variables.

Key variables:
```env
NODE_ENV=development
PORT=5000
DATABASE_URL="mongodb://localhost:27017/kuyashfarm"
JWT_ACCESS_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-key
CORS_ORIGIN=http://localhost:3000
```

## Database Schema

Comprehensive schema supporting:
- User authentication & authorization
- Product catalog with bulk pricing
- Order management
- Wholesale & distributor applications
- Inventory tracking
- Restock management

See `prisma/schema.prisma` for full schema.

## Middleware Pipeline

```
Request
  ↓
Helmet (security headers)
  ↓
CORS (cross-origin)
  ↓
Rate Limiting
  ↓
Body Parser
  ↓
Cookie Parser
  ↓
Morgan (logging)
  ↓
Route Handler
  ↓
Auth Middleware (if protected)
  ↓
Validation Middleware
  ↓
Controller
  ↓
Service
  ↓
Response / Error Handler
```

## Error Handling

Centralized error handling with:
- Custom `AppError` class for operational errors
- Global error handler middleware
- Async error wrapper for route handlers
- Structured error responses
- Comprehensive logging

## Logging

Winston-based logging with:
- Console output (development)
- File output (`logs/combined.log`, `logs/error.log`)
- Log levels: error, warn, info, http, debug
- Colored console output
- JSON format for production

## Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

## Deployment

### Development
```bash
npm run dev
```

### Production
```bash
# Build
npm run build

# Start
npm run start
```

### With PM2
```bash
pm2 start dist/server.js --name kuyashfarm-api
```

### With Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
RUN npm run prisma:generate
EXPOSE 5000
CMD ["npm", "start"]
```

## Best Practices

✅ TypeScript strict mode enabled
✅ Async/await error handling
✅ Input validation on all endpoints
✅ Proper HTTP status codes
✅ Standardized API responses
✅ Comprehensive logging
✅ Environment-based configuration
✅ Database connection pooling
✅ Graceful shutdown handling
✅ Security headers
✅ Rate limiting
✅ CORS configuration

## Common Tasks

### Add New Endpoint

1. **Create validator** in `src/validators/`
2. **Create service method** in `src/services/`
3. **Create controller** in `src/controllers/`
4. **Add route** in `src/routes/`
5. **Test endpoint**

### Update Database Schema

```bash
# Edit prisma/schema.prisma
# Then run:
npm run migrate
npm run prisma:generate
```

### Debug Issues

```bash
# Check logs
tail -f logs/combined.log
tail -f logs/error.log

# Open Prisma Studio
npm run prisma:studio

# Test endpoints
curl -X GET http://localhost:5000/api/v1/health
```

## Future Enhancements

- [ ] Email verification
- [ ] Password reset
- [ ] Social authentication
- [ ] Two-factor authentication
- [ ] Admin user management
- [ ] Product management APIs
- [ ] Order processing
- [ ] Payment integration
- [ ] Notification system
- [ ] Analytics & reporting
- [ ] Image upload
- [ ] Search functionality

## Support

For detailed setup instructions, see:
- [QUICKSTART.md](../QUICKSTART.md) - Quick setup guide
- [AUTHENTICATION_SETUP.md](../AUTHENTICATION_SETUP.md) - Full documentation

## License

MIT

---

**Built with ❤️ for Kuyash Farm**
