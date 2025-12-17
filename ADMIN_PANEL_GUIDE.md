# Admin Panel Guide - Wholesale Application Management

## Overview
Simple frontend-only admin panel for testing wholesale application approval flow. This is NOT production-ready and uses localStorage for demonstration purposes.

---

## Quick Start

### 1. Create Admin User (Testing)
Visit `/wholesale-demo` and click **"Create Test Admin User"** button, then refresh the page.

OR manually set admin flag:
```javascript
// In browser console or via code:
localStorage.setItem('user', JSON.stringify({
  name: 'Admin User',
  email: 'admin@kuyashfarm.com',
  userType: 'retail',
  isAdmin: true
}));
```

### 2. Create Sample Applications (Testing)
Visit `/wholesale-demo` and click **"Create Sample Applications"** to generate test data.

### 3. Access Admin Panel
Navigate to `/admin` - you'll be redirected if not admin.

---

## Admin Routes

### `/admin` - Dashboard
- Overview of wholesale applications
- Statistics (total, pending, approved, rejected)
- Quick action to review applications

### `/admin/wholesale-applications` - Main Working Page
- Table view of all applications
- Filter by status (pending, approved, rejected, all)
- Approve/reject actions for pending applications

---

## How Admin Actions Work

### Approving an Application
1. Admin clicks **"Approve"** button
2. Confirmation dialog appears
3. On confirm:
   - Application status → `'approved'`
   - User's `userType` → `'wholesale_verified'`
   - User immediately gets bulk pricing access
4. Application moves to "Approved" tab

### Rejecting an Application
1. Admin clicks **"Reject"** button
2. Modal opens asking for optional rejection reason
3. On submit:
   - Application status → `'rejected'`
   - User's `userType` → `'retail'` (downgraded)
   - Rejection reason saved (optional)
4. Application moves to "Rejected" tab

---

## File Structure

```
/frontend
├── /app
│   ├── /admin
│   │   ├── page.tsx                        # Admin dashboard
│   │   └── /wholesale-applications
│   │       └── page.tsx                    # Applications management
│   └── /wholesale-demo
│       └── page.tsx                        # Demo + testing tools
├── /lib
│   ├── admin-utils.ts                      # Admin helper functions
│   └── utils.ts                            # Updated with admin-aware user type
├── /types.ts                               # Added WholesaleApplication interface
└── /components
    ├── /banners
    │   └── WholesaleBanner.tsx            # Retail user banner
    └── /modals
        └── WholesaleApplicationModal.tsx   # Application form
```

---

## Key Functions (in `/lib/admin-utils.ts`)

### Access Control
```typescript
isCurrentUserAdmin()
// Returns: boolean
// Checks if logged-in user has isAdmin === true
```

### Application Management
```typescript
getAllApplications()
// Returns: WholesaleApplication[]
// Gets all applications from localStorage

getPendingApplications()
// Returns: WholesaleApplication[]
// Filters only pending applications

approveApplication(applicationId: string)
// Updates application to 'approved'
// Updates user to 'wholesale_verified'

rejectApplication(applicationId: string, reason?: string)
// Updates application to 'rejected'
// Downgrades user to 'retail'
```

### Testing Helpers
```typescript
createTestAdmin()
// Creates admin user in localStorage

createSampleApplications()
// Generates 3 sample pending applications
```

---

## User Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    WHOLESALE UPGRADE FLOW                    │
└─────────────────────────────────────────────────────────────┘

1. RETAIL USER (Default)
   │
   ├─► Sees product pages
   ├─► Sees "Apply for wholesale" banner
   └─► Clicks "Apply"
       │
       ▼
2. USER FILLS APPLICATION FORM
   │
   ├─► Business Name
   └─► Business Address
       │
       ▼
3. USER BECOMES "wholesale_pending"
   │
   ├─► Application saved to localStorage
   ├─► User sees "Application Pending" banner
   └─► Still shops at retail prices
       │
       ▼
4. ADMIN REVIEWS APPLICATION
   │
   ├─► Views in /admin/wholesale-applications
   ├─► Sees business details
   └─► Decision:
       │
       ├─► APPROVE ────────────────┐
       │                           │
       └─► REJECT ─────────────┐   │
                               │   │
                               ▼   ▼
5. USER UPDATED            RETAIL  WHOLESALE_VERIFIED
   │                         │      │
   └─────────────────────────┴──────┴────► User receives outcome
                                            │
                                            ▼
                                    Retail: No change
                                    Verified: Bulk pricing unlocked!
```

---

## Data Storage (Frontend Only)

### localStorage Keys

**`user`** - Current logged-in user
```json
{
  "id": "user_123",
  "name": "John Doe",
  "email": "john@example.com",
  "userType": "retail",
  "isAdmin": false,
  "businessInfo": {
    "businessName": "ABC Trading",
    "businessAddress": "123 Business St"
  }
}
```

**`wholesale_applications`** - All applications
```json
[
  {
    "id": "app_1234567890",
    "userId": "user_123",
    "userName": "John Doe",
    "userEmail": "john@example.com",
    "businessName": "ABC Trading Ltd",
    "businessAddress": "123 Business St, Lagos",
    "status": "pending",
    "appliedAt": "2025-12-14T10:30:00Z",
    "reviewedAt": null,
    "rejectionReason": null
  }
]
```

---

## Route Protection Logic

### `/admin/*` pages check:
```typescript
useEffect(() => {
  const isAdmin = isCurrentUserAdmin();
  if (!isAdmin) {
    router.push('/'); // Redirect non-admins
    return;
  }
  setIsAuthorized(true);
}, [router]);
```

### Access Requirements:
1. User must be logged in (`user` exists in localStorage)
2. User must have `isAdmin: true`
3. Otherwise → redirect to homepage

---

## Testing the Complete Flow

### Step 1: Setup Admin User
```bash
# Visit: /wholesale-demo
# Click: "Create Test Admin User"
# Result: Admin user created
```

### Step 2: Create Test Applications
```bash
# Visit: /wholesale-demo
# Click: "Create Sample Applications"
# Result: 3 pending applications created
```

### Step 3: Access Admin Panel
```bash
# Visit: /admin
# Should see: Dashboard with stats
```

### Step 4: Review Applications
```bash
# Visit: /admin/wholesale-applications
# Should see: Table with 3 pending applications
```

### Step 5: Test Approval
```bash
# Click: "Approve" on first application
# Confirm: Dialog
# Result: Application approved, user upgraded
```

### Step 6: Test Rejection
```bash
# Click: "Reject" on second application
# Enter: Optional reason
# Submit: Confirm
# Result: Application rejected, user downgraded
```

### Step 7: Verify User Impact
```bash
# Option A: Check localStorage manually
# Option B: Test on main site (approved users get bulk pricing)
```

---

## Important Notes

### Security Warnings
⚠️ **This is NOT production-ready**
- No server-side validation
- Admin flag can be manually set in localStorage
- No audit logs or history tracking
- No password verification
- Applications stored in browser only

### Frontend-Only Limitations
- Data persists per browser/device only
- No synchronization across users
- Refreshing or clearing localStorage loses data
- No real-time updates

### When to Upgrade to Backend
When you need:
- Real database storage
- Server-side validation
- User authentication/authorization
- Multi-device support
- Email notifications
- Audit trails
- Role-based access control (RBAC)

---

## Migration to Backend

### Future API Endpoints Needed:

**POST `/api/wholesale/apply`**
```json
{
  "businessName": "ABC Trading Ltd",
  "businessAddress": "123 Business St"
}
```

**GET `/api/admin/applications`**
```json
{
  "applications": [...]
}
```

**PATCH `/api/admin/applications/:id/approve`**
```json
{
  "status": "approved"
}
```

**PATCH `/api/admin/applications/:id/reject`**
```json
{
  "status": "rejected",
  "reason": "Incomplete information"
}
```

---

## Troubleshooting

### Can't access `/admin`
- Check if user has `isAdmin: true` in localStorage
- Use browser console: `JSON.parse(localStorage.getItem('user'))`
- Run `createTestAdmin()` helper function

### No applications showing
- Run `createSampleApplications()` from `/wholesale-demo`
- Check localStorage key `wholesale_applications`

### Applications not updating after approval
- Check browser console for errors
- Verify localStorage is not disabled
- Try refreshing the page

### User not getting wholesale pricing after approval
- Verify user's `userType` changed to `'wholesale_verified'`
- Check if product has `bulkPricing` defined
- Ensure quantity meets minimum threshold (10+ units)

---

## Current Implementation Status

✅ **Completed:**
- User type system (retail, wholesale_pending, wholesale_verified)
- Wholesale application form modal
- Application storage in localStorage
- Admin dashboard UI (`/admin`)
- Application management page (`/admin/wholesale-applications`)
- Approve/reject functionality
- User type updates on approval/rejection
- Route protection for admin pages
- Testing utilities (createTestAdmin, createSampleApplications)

⏳ **Future Enhancements:**
- Backend API integration
- Database persistence
- Email notifications to users
- Admin user management
- Application history/audit logs
- Bulk actions (approve/reject multiple)
- Export applications to CSV
- Advanced filtering and search

---

## Support

For issues or questions:
1. Check browser console for errors
2. Verify localStorage structure
3. Test with sample data using `/wholesale-demo`
4. Review this documentation

---

**Last Updated:** December 14, 2025
**Status:** Frontend-only implementation complete
**Next Step:** Backend API integration
