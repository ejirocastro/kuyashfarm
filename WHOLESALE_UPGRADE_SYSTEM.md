# Wholesale Upgrade System - Implementation Summary

## Overview
Simple, minimal upgrade system for wholesale pricing - similar to Airbnb's guest → host model. No redesign, no separate apps, just a clean state upgrade layered onto your existing retail shop.

---

## User States (3 types)

### 1. `retail` (Default)
- **All users start here** after signup/login
- See retail product pages (unchanged)
- See retail prices only
- Can browse and purchase normally

### 2. `wholesale_pending`
- User has applied for wholesale access
- **Still shops as retail** - sees retail prices
- Sees "Application Pending" banner
- Can continue shopping while waiting for verification

### 3. `wholesale_verified`
- Admin has verified the business
- **Same product pages** - no separate wholesale section
- Sees **quantity-based pricing** automatically
- Bulk discounts apply when quantity meets thresholds

---

## How It Works

### Login/Signup Flow
```typescript
// All users stored with userType: 'retail' by default
{
  name: "John Doe",
  email: "john@example.com",
  userType: "retail"  // ← Everyone starts here
}
```

### Wholesale Application
**Trigger:** Retail user clicks "Apply for wholesale pricing" banner

**Collects:**
- Business Name
- Business Address

**Result:**
```typescript
{
  name: "John Doe",
  email: "john@example.com",
  userType: "wholesale_pending",  // ← Status changes
  businessInfo: {
    businessName: "ABC Trading Ltd",
    businessAddress: "123 Business St, Lagos"
  }
}
```

**User Experience:**
- Application submitted notification
- Can continue shopping at retail prices
- Sees "Application Pending" banner

### Admin Verification (Backend)
When admin approves:
```typescript
{
  userType: "wholesale_verified"  // ← Admin changes this
}
```

---

## Pricing Logic

### Product Structure
```typescript
{
  id: 1,
  name: "Organic Tomatoes",
  price: 7500,  // ← Retail price (everyone sees this by default)
  bulkPricing: [
    { minQuantity: 10, pricePerUnit: 6500 },   // 10+ units = ₦6,500/kg
    { minQuantity: 50, pricePerUnit: 6000 }    // 50+ units = ₦6,000/kg
  ]
}
```

### Price Calculation
```typescript
function calculatePrice(product, quantity, userType) {
  // Retail & pending users → Always retail price
  if (userType !== 'wholesale_verified') {
    return product.price;  // ₦7,500
  }

  // Verified wholesale users → Quantity-based pricing
  if (quantity >= 50) return 6000;  // ₦6,000
  if (quantity >= 10) return 6500;  // ₦6,500
  return product.price;             // ₦7,500
}
```

**Examples:**
| User Type | Quantity | Price Per Unit |
|-----------|----------|----------------|
| retail | 1 | ₦7,500 |
| retail | 100 | ₦7,500 |
| wholesale_pending | 100 | ₦7,500 |
| wholesale_verified | 5 | ₦7,500 |
| wholesale_verified | 15 | ₦6,500 |
| wholesale_verified | 60 | ₦6,000 |

---

## UI Components Added

### 1. **WholesaleBanner** (Green gradient banner)
- **Shown to:** `retail` users only
- **Message:** "Buying in bulk? Save with wholesale pricing"
- **Action:** Opens application modal
- **Location:** Top of shop pages

### 2. **Pending Banner** (Amber banner)
- **Shown to:** `wholesale_pending` users only
- **Message:** "Application Pending: Your wholesale application is under review"
- **Action:** None (informational)

### 3. **WholesaleApplicationModal**
- **Trigger:** User clicks "Apply" in banner
- **Fields:** Business Name, Business Address
- **On Submit:** Updates userType to `wholesale_pending`
- **Note:** Explains bulk pricing unlocks after verification

---

## Files Modified/Created

### **New Components:**
```
/components/modals/WholesaleApplicationModal.tsx
/components/banners/WholesaleBanner.tsx
```

### **Modified Files:**
```
/types.ts                          - Added User, UserType, bulkPricing
/lib/utils.ts                      - Added calculatePrice(), getCurrentUser()
/lib/constants.ts                  - Added bulkPricing to sample product
/components/auth/AuthModal.tsx     - Store userType: 'retail' on signup
/app/shop/[category]/page.tsx      - Show banners, handle application
```

---

## Usage Example

### For Retail Users:
1. User logs in → Automatically `retail`
2. Browses products → Sees retail prices
3. Sees banner: "Buying in bulk? Save with wholesale pricing"
4. **Option A:** Ignore banner, continue shopping as retail
5. **Option B:** Click "Apply" → Fill out form → Status becomes `wholesale_pending`

### For Pending Users:
1. Shops at retail prices (same experience)
2. Sees "Application Pending" banner
3. Waits for admin verification

### For Verified Wholesale Users:
1. **Same product pages** (no separate section)
2. When adding to cart:
   - 1-9 units → Retail price (₦7,500)
   - 10-49 units → Tier 1 discount (₦6,500)
   - 50+ units → Tier 2 discount (₦6,000)
3. Discounts apply automatically based on quantity

---

## Key Principles Followed

✅ **One Login System** - Everyone logs in the same way
✅ **Retail Default** - All users start as retail
✅ **No Redesign** - Same product pages for everyone
✅ **Quantity-Based** - Not category-based or separate inventory
✅ **Minimal UI** - Just banners and one modal
✅ **Upgrade Model** - Like Airbnb guest → host
✅ **No Duplication** - No separate wholesale site/pages

---

## Backend Integration (When Ready)

### API Endpoints Needed:

**1. POST `/api/wholesale/apply`**
```json
{
  "businessName": "ABC Trading Ltd",
  "businessAddress": "123 Business St, Lagos"
}
```
Response:
```json
{
  "status": "pending",
  "message": "Application submitted for review"
}
```

**2. PATCH `/api/users/:id/verify-wholesale`** (Admin only)
```json
{
  "userType": "wholesale_verified"
}
```

**3. GET `/api/users/me`**
Returns current user with `userType` field.

---

## Admin Dashboard Needs

Simple table to review applications:
- User name/email
- Business name
- Business address
- Application date
- **Actions:** Approve / Reject

On approval → Update `user.userType = 'wholesale_verified'`

---

## Example Flow Diagram

```
┌─────────────┐
│   Sign Up   │
└──────┬──────┘
       │
       ▼
   userType: 'retail'
       │
       ├──► Continue Shopping (Retail Prices)
       │
       └──► Click "Apply for Wholesale"
              │
              ▼
          Fill Form (Business Info)
              │
              ▼
       userType: 'wholesale_pending'
              │
              ├──► Continue Shopping (Still Retail Prices)
              │
              ▼
          Admin Reviews Application
              │
              ▼
       userType: 'wholesale_verified'
              │
              ▼
      Same Pages, Quantity-Based Pricing!
       - 1-9 units: Retail price
       - 10+ units: Bulk discount
```

---

## Testing Scenarios

### Test 1: Default Retail User
1. Sign up new account
2. Verify `userType === 'retail'`
3. Browse products → Should see retail prices
4. Should see green "Apply for wholesale" banner

### Test 2: Apply for Wholesale
1. Click "Apply for wholesale" button
2. Fill business name & address
3. Submit form
4. Verify `userType === 'wholesale_pending'`
5. Should see amber "Application Pending" banner
6. Prices should still be retail

### Test 3: Verified Wholesale
1. Manually change localStorage: `userType: 'wholesale_verified'`
2. Add 5 tomatoes → Should be ₦7,500/kg
3. Add 15 tomatoes → Should be ₦6,500/kg
4. Add 60 tomatoes → Should be ₦6,000/kg

---

## Next Steps

1. �� **Frontend Complete** - Minimal upgrade system implemented
2. ⏳ **Add to More Products** - Add `bulkPricing` to more products in constants.ts
3. ⏳ **Backend API** - Create wholesale application endpoint
4. ⏳ **Admin Dashboard** - Create simple approval interface
5. ⏳ **Email Notifications** - Notify users when verified
6. ⏳ **Cart Integration** - Show bulk savings in cart/checkout

---

**Status:** ✅ Frontend implementation complete
**Impact:** Minimal - only adds banners and one modal
**Breaking Changes:** None - fully backward compatible
