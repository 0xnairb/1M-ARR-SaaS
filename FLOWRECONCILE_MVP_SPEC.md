# FlowReconcile: MVP Technical Specification
## Build Plan for V1.0

**Target Launch**: 12 weeks from start
**Version**: 1.0 (MVP)
**Status**: Ready to build

---

## Executive Summary

This document spec

ifies exactly what to build for FlowReconcile V1.0 MVP - no more, no less.

**Core Promise**: Connect Shopify + Stripe + QuickBooks, automatic reconciliation happens daily.

**Success Criteria**:
- User can connect all three platforms in <5 minutes
- First sync completes successfully
- Reconciliation creates accurate journal entries in QuickBooks
- User sees dashboard confirming everything worked

---

## User Stories & Acceptance Criteria

### Epic 1: Authentication & Onboarding

**User Story 1.1**: As a user, I can sign up for FlowReconcile

**Acceptance Criteria**:
- [ ] User can sign up with email/password
- [ ] Email verification sent
- [ ] User redirected to dashboard after signup
- [ ] Welcome email sent

**User Story 1.2**: As a user, I can log in and out

**Acceptance Criteria**:
- [ ] User can log in with credentials
- [ ] Session persists across page reloads
- [ ] User can log out
- [ ] "Forgot password" flow works

---

### Epic 2: Integration Connections

**User Story 2.1**: As a user, I can connect my Shopify store

**Acceptance Criteria**:
- [ ] "Connect Shopify" button starts OAuth flow
- [ ] User is redirected to Shopify for authorization
- [ ] OAuth callback handles success/error
- [ ] Shop data saved (shop name, domain, currency)
- [ ] Access token encrypted and stored
- [ ] Connection status shown on dashboard

**Technical Notes**:
- Use Shopify OAuth 2.0
- Scopes needed: `read_orders`, `read_products`, `read_customers`
- Store access token encrypted in database

**User Story 2.2**: As a user, I can connect my Stripe account

**Acceptance Criteria**:
- [ ] "Connect Stripe" button starts OAuth flow
- [ ] User authorizes on Stripe
- [ ] OAuth callback saves connection
- [ ] Account ID and publishable key retrieved
- [ ] Connection status shown on dashboard

**Technical Notes**:
- Use Stripe Connect OAuth
- Scopes: `read_only` access to charges, payouts, balance transactions

**User Story 2.3**: As a user, I can connect QuickBooks Online

**Acceptance Criteria**:
- [ ] "Connect QuickBooks" button starts OAuth
- [ ] User authorizes on Intuit
- [ ] Company ID (realmId) saved
- [ ] Connection status shown on dashboard

**Technical Notes**:
- Intuit OAuth 2.0
- Scopes: `com.intuit.quickbooks.accounting`

---

### Epic 3: Initial Data Sync

**User Story 3.1**: As a user, after connecting all integrations, an initial sync runs automatically

**Acceptance Criteria**:
- [ ] System detects all 3 integrations connected
- [ ] Sync job queued automatically
- [ ] User sees "Sync in progress" message
- [ ] Progress indicator shows status

**User Story 3.2**: As a user, I can see sync history and status

**Acceptance Criteria**:
- [ ] Dashboard shows "Last synced: X minutes ago"
- [ ] Sync status: Completed, Running, or Failed
- [ ] If failed, error message displayed
- [ ] Can manually trigger re-sync

**Technical Notes**:
- Default sync period: Last 90 days
- Limit: 5,000 orders for initial sync
- Queue job in background (Inngest)
- Webhook handlers for real-time updates

---

### Epic 4: Reconciliation Engine

**User Story 4.1**: As a system, I fetch data from all sources

**Data to Fetch**:

**From Shopify**:
- Orders (id, name, created_at, total_price, currency)
- Line items
- Refunds
- Transactions (payment details)

**From Stripe**:
- Charges (amount, fee, net, status)
- Payouts (amount, arrival_date, status)
- Balance transactions
- Refunds

**From QuickBooks**:
- Chart of accounts
- Existing transactions (to avoid duplicates)

**User Story 4.2**: As a system, I match Shopify orders to Stripe charges

**Matching Logic**:
1. Match by Shopify transaction ID (if available)
2. Fallback: Match by amount + date (within 24 hours)
3. If ambiguous, flag for manual review

**Acceptance Criteria**:
- [ ] 95%+ of orders matched automatically
- [ ] Unmatched transactions flagged
- [ ] User can manually match flagged items

**User Story 4.3**: As a system, I create journal entries in QuickBooks

**Journal Entry Structure**:
```
For each Stripe payout:

  DEBIT: Bank Account (Checking) = Payout Amount
  CREDIT: Shopify Sales = Gross Sales
  CREDIT: Shopify Fees = Fees
  CREDIT: Stripe Fees = Processing Fees
  DEBIT/CREDIT: Refunds = Refund amounts
```

**Acceptance Criteria**:
- [ ] Journal entries created with correct amounts
- [ ] Entries include memo (date range, payout ID)
- [ ] No duplicate entries
- [ ] Entries can be viewed in QuickBooks
- [ ] Undeposited funds account used correctly

**User Story 4.4**: As a user, I can review reconciliation before posting

**Acceptance Criteria**:
- [ ] Summary shown: # orders, total sales, fees, net
- [ ] Discrepancies highlighted
- [ ] User can approve or reject
- [ ] Only approved reconciliations posted to QB

---

### Epic 5: Dashboard & Reporting

**User Story 5.1**: As a user, I see a dashboard with sync status

**Dashboard Elements**:
- Connection status (green check or red X for each integration)
- Last sync timestamp
- Next sync countdown
- Summary stats:
  - Orders synced (last 30 days)
  - Total sales
  - Total fees
  - Net deposited
- Recent activity log

**Acceptance Criteria**:
- [ ] Dashboard loads in <2 seconds
- [ ] Real-time status updates
- [ ] Mobile responsive

**User Story 5.2**: As a user, I can view reconciliation details

**Acceptance Criteria**:
- [ ] List of all reconciliations
- [ ] Filter by date range
- [ ] Click to see details (matched transactions)
- [ ] Export to CSV

---

### Epic 6: Billing & Subscription

**User Story 6.1**: As a user, I start on a 14-day free trial

**Acceptance Criteria**:
- [ ] Trial starts automatically on signup
- [ ] No credit card required for trial
- [ ] Trial end date displayed
- [ ] Email sent 3 days before trial ends

**User Story 6.2**: As a user, I can subscribe to a paid plan

**Acceptance Criteria**:
- [ ] Plans displayed (Starter, Growth, Scale)
- [ ] User can select plan
- [ ] Stripe Checkout for payment
- [ ] Subscription created in Stripe
- [ ] Access granted immediately
- [ ] Confirmation email sent

**User Story 6.3**: As a user, I can upgrade/downgrade plans

**Acceptance Criteria**:
- [ ] User can change plan from settings
- [ ] Proration calculated correctly
- [ ] Changes take effect immediately
- [ ] Confirmation email sent

**User Story 6.4**: As a user, I can cancel subscription

**Acceptance Criteria**:
- [ ] Cancel button in settings
- [ ] Confirmation modal
- [ ] Access continues until end of billing period
- [ ] Data retained for 30 days after cancellation

---

### Epic 7: Error Handling & Support

**User Story 7.1**: As a user, if something goes wrong, I see a helpful error message

**Acceptance Criteria**:
- [ ] Clear error messages (not technical jargon)
- [ ] Suggested actions to resolve
- [ ] Contact support button
- [ ] Errors logged for debugging

**User Story 7.2**: As a user, I can contact support

**Acceptance Criteria**:
- [ ] Support email: support@flowreconcile.com
- [ ] In-app chat widget (Intercom or similar)
- [ ] Help center with FAQs
- [ ] Response within 24 hours

---

## Technical Architecture

### Stack Selection

**Frontend**:
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **State**: React Query (server state) + Zustand (client state)
- **Forms**: React Hook Form + Zod validation

**Backend**:
- **API**: Next.js API Routes
- **Database**: PostgreSQL (via Supabase)
- **ORM**: Prisma
- **Job Queue**: Inngest (background jobs)
- **File Storage**: Supabase Storage (for exports)

**Infrastructure**:
- **Hosting**: Vercel (frontend + API)
- **Database**: Supabase or Railway
- **Auth**: Clerk
- **Payments**: Stripe
- **Email**: Resend
- **Monitoring**: Sentry (errors) + PostHog (analytics)

### Database Schema

```prisma
// schema.prisma

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())

  organizations OrganizationMember[]
}

model Organization {
  id        String   @id @default(uuid())
  name      String
  plan      String   @default("trial") // trial, starter, growth, scale
  status    String   @default("active") // active, cancelled, past_due
  trialEndsAt DateTime?
  createdAt DateTime @default(now())

  members      OrganizationMember[]
  integrations Integration[]
  syncJobs     SyncJob[]
  transactions Transaction[]
  reconciliations Reconciliation[]
}

model OrganizationMember {
  id             String   @id @default(uuid())
  organizationId String
  userId         String
  role           String   @default("owner") // owner, admin, member

  organization Organization @relation(fields: [organizationId], references: [id])
  user         User        @relation(fields: [userId], references: [id])

  @@unique([organizationId, userId])
}

model Integration {
  id             String   @id @default(uuid())
  organizationId String
  type           String   // shopify, stripe, quickbooks
  credentials    Json     // encrypted OAuth tokens
  config         Json?    // platform-specific settings
  status         String   @default("active") // active, error, disconnected
  lastSyncAt     DateTime?
  createdAt      DateTime @default(now())

  organization Organization @relation(fields: [organizationId], references: [id])

  @@unique([organizationId, type])
}

model SyncJob {
  id             String   @id @default(uuid())
  organizationId String
  type           String   // initial, scheduled, manual
  status         String   @default("pending") // pending, running, completed, failed
  progress       Int      @default(0) // 0-100
  startedAt      DateTime?
  completedAt    DateTime?
  errorMessage   String?
  metadata       Json?

  organization Organization @relation(fields: [organizationId], references: [id])
}

model Transaction {
  id             String   @id @default(uuid())
  organizationId String
  source         String   // shopify, stripe
  sourceId       String   // external ID
  type           String   // order, payout, refund, fee, charge
  amount         Decimal  @db.Decimal(10, 2)
  currency       String   @default("USD")
  date           DateTime
  status         String   // pending, completed, failed
  metadata       Json     // full transaction data
  reconciledAt   DateTime?
  reconciliationId String?

  organization     Organization     @relation(fields: [organizationId], references: [id])
  reconciliation   Reconciliation?  @relation(fields: [reconciliationId], references: [id])

  @@index([organizationId, source, sourceId])
  @@index([organizationId, date])
}

model Reconciliation {
  id             String   @id @default(uuid())
  organizationId String
  startDate      DateTime
  endDate        DateTime
  status         String   @default("draft") // draft, approved, posted, failed
  totalSales     Decimal  @db.Decimal(10, 2)
  totalFees      Decimal  @db.Decimal(10, 2)
  totalRefunds   Decimal  @db.Decimal(10, 2)
  netAmount      Decimal  @db.Decimal(10, 2)
  qbJournalId    String?  // QuickBooks journal entry ID
  approvedBy     String?
  approvedAt     DateTime?
  postedAt       DateTime?
  errorMessage   String?
  createdAt      DateTime @default(now())

  organization Organization @relation(fields: [organizationId], references: [id])
  transactions Transaction[]

  @@index([organizationId, status])
  @@index([organizationId, createdAt])
}
```

### API Routes Structure

```
/api
├── auth/
│   ├── signup
│   ├── login
│   └── logout
├── integrations/
│   ├── shopify/
│   │   ├── connect
│   │   ├── callback
│   │   └── disconnect
│   ├── stripe/
│   │   ├── connect
│   │   ├── callback
│   │   └── disconnect
│   └── quickbooks/
│       ├── connect
│       ├── callback
│       └── disconnect
├── sync/
│   ├── trigger
│   ├── status/[jobId]
│   └── history
├── reconciliations/
│   ├── list
│   ├── [id]
│   ├── approve/[id]
│   └── export
├── billing/
│   ├── plans
│   ├── subscribe
│   ├── portal
│   └── webhook (Stripe webhooks)
└── webhooks/
    ├── shopify
    └── stripe
```

### Reconciliation Algorithm

**High-Level Flow**:
```typescript
async function reconcile(organizationId: string, dateRange: DateRange) {
  // 1. Fetch all data
  const shopifyOrders = await fetchShopifyOrders(organizationId, dateRange)
  const stripePayouts = await fetchStripePayouts(organizationId, dateRange)
  const stripeCharges = await fetchStripeCharges(organizationId, dateRange)

  // 2. Match Shopify orders to Stripe charges
  const matched = matchOrdersToCharges(shopifyOrders, stripeCharges)

  // 3. Group by payout
  const groupedByPayout = groupByPayout(matched, stripePayouts)

  // 4. Calculate totals for each payout
  const reconciliations = groupedByPayout.map(group => ({
    payoutId: group.payoutId,
    payoutAmount: group.payout.amount,
    grossSales: sum(group.orders.map(o => o.total)),
    shopifyFees: sum(group.orders.map(o => o.shopify_fee)),
    stripeFees: sum(group.charges.map(c => c.fee)),
    refunds: sum(group.refunds.map(r => r.amount)),
    net: calculateNet(group),
  }))

  // 5. Create journal entries
  for (const recon of reconciliations) {
    await createQuickBooksJournalEntry(recon)
  }

  return reconciliations
}
```

**Matching Logic**:
```typescript
function matchOrdersToCharges(orders, charges) {
  const matched = []
  const unmatched = { orders: [], charges: [] }

  for (const order of orders) {
    // Try to find matching charge
    const charge = charges.find(c =>
      c.metadata.shopify_order_id === order.id ||
      (Math.abs(c.amount - order.total) < 0.01 &&
       Math.abs(c.created - order.created_at) < 86400) // within 24h
    )

    if (charge) {
      matched.push({ order, charge })
    } else {
      unmatched.orders.push(order)
    }
  }

  return { matched, unmatched }
}
```

### Background Jobs (Inngest)

**Job 1: Scheduled Sync**
- Runs daily at 2 AM
- Syncs data from last 7 days
- Creates reconciliations for completed payouts

**Job 2: Initial Sync**
- Triggered when all 3 integrations connected
- Syncs last 90 days
- Sends completion email

**Job 3: Webhook Handler**
- Triggered by Shopify/Stripe webhooks
- Real-time sync for new orders/payouts
- Updates existing records

```typescript
// inngest/functions.ts

export const dailySync = inngest.createFunction(
  { name: "Daily Sync" },
  { cron: "0 2 * * *" }, // 2 AM daily
  async ({ step }) => {
    const orgs = await step.run("get-active-orgs", async () => {
      return db.organization.findMany({ where: { status: "active" } })
    })

    for (const org of orgs) {
      await step.run(`sync-${org.id}`, async () => {
        return syncOrganization(org.id, { days: 7 })
      })
    }
  }
)
```

---

## UI/UX Specifications

### Page Structure

**1. Landing Page** (`/`)
- Hero section with value prop
- Benefits (save time, accuracy, real-time)
- How it works (3 steps)
- Pricing table
- CTA: "Start Free Trial"

**2. Dashboard** (`/dashboard`)
- Connection status cards
- Sync status
- Summary stats
- Recent reconciliations
- Quick actions

**3. Integrations Page** (`/integrations`)
- List of integrations (Shopify, Stripe, QB)
- Connect buttons
- Settings for each
- Disconnect option

**4. Reconciliations Page** (`/reconciliations`)
- Table of all reconciliations
- Filters (date range, status)
- View details
- Approve/reject
- Export CSV

**5. Settings** (`/settings`)
- Account settings
- Billing & subscription
- Team members (future)
- Notifications

### Design System

**Colors**:
- Primary: #3B82F6 (blue)
- Success: #10B981 (green)
- Warning: #F59E0B (amber)
- Error: #EF4444 (red)
- Gray scale: Tailwind default

**Typography**:
- Font: Inter (clean, modern)
- Headings: 600 weight
- Body: 400 weight

**Components** (shadcn/ui):
- Button
- Card
- Table
- Dialog (Modal)
- Badge
- Toast (notifications)
- Tabs
- Select
- Input

### Key Screens Wireframes

**Dashboard**:
```
┌─────────────────────────────────────────┐
│ FlowReconcile          User Menu ▼      │
├─────────────────────────────────────────┤
│                                         │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐   │
│ │Shopify  │ │ Stripe  │ │QuickBooks│  │
│ │   ✓     │ │   ✓     │ │    ✓     │  │
│ │Connected│ │Connected│ │Connected │  │
│ └─────────┘ └─────────┘ └─────────┘   │
│                                         │
│ Last Synced: 5 minutes ago              │
│ Next Sync: in 55 minutes      [Sync Now]│
│                                         │
│ ┌─────────────────────────────────────┐│
│ │ Last 30 Days Summary                ││
│ │                                     ││
│ │ Orders Synced: 1,234                ││
│ │ Total Sales: $45,678.90             ││
│ │ Total Fees: $1,234.56               ││
│ │ Net Deposited: $44,444.34           ││
│ └─────────────────────────────────────┘│
│                                         │
│ Recent Reconciliations:                 │
│ ┌───────────────────────────────┐      │
│ │ Oct 28-Nov 3  $12,345  ✓Posted│      │
│ │ Oct 21-27     $11,234  ✓Posted│      │
│ │ Oct 14-20     $10,123  ✓Posted│      │
│ └───────────────────────────────┘      │
└─────────────────────────────────────────┘
```

**Integrations Page**:
```
┌─────────────────────────────────────────┐
│ Integrations                            │
├─────────────────────────────────────────┤
│                                         │
│ ┌─────────────────────────────────────┐│
│ │ 🛍 Shopify                          ││
│ │ Connected: store-name.myshopify.com ││
│ │ Last Sync: 5 minutes ago            ││
│ │                       [Disconnect]  ││
│ └─────────────────────────────────────┘│
│                                         │
│ ┌─────────────────────────────────────┐│
│ │ 💳 Stripe                           ││
│ │ Connected: acct_1234567890          ││
│ │ Last Sync: 5 minutes ago            ││
│ │                       [Disconnect]  ││
│ └─────────────────────────────────────┘│
│                                         │
│ ┌─────────────────────────────────────┐│
│ │ 📊 QuickBooks Online                ││
│ │ Connected: My Company LLC           ││
│ │ Last Sync: 5 minutes ago            ││
│ │                       [Disconnect]  ││
│ └─────────────────────────────────────┘│
└─────────────────────────────────────────┘
```

---

## Security & Compliance

### Security Checklist

**Authentication & Authorization**:
- [ ] Passwords hashed with bcrypt (via Clerk)
- [ ] OAuth 2.0 for all integrations
- [ ] JWT tokens for API authentication
- [ ] Row-level security in database
- [ ] Role-based access control

**Data Protection**:
- [ ] All API calls over HTTPS only
- [ ] OAuth tokens encrypted at rest (AES-256)
- [ ] No sensitive data in logs
- [ ] Database backups encrypted
- [ ] PII handled per GDPR requirements

**API Security**:
- [ ] Rate limiting (100 requests/minute per user)
- [ ] Input validation (Zod schemas)
- [ ] SQL injection prevention (Prisma ORM)
- [ ] XSS protection (React escaping)
- [ ] CSRF tokens

**Infrastructure**:
- [ ] Environment variables for secrets (Vercel)
- [ ] Secrets rotation policy
- [ ] Monitoring & alerting (Sentry)
- [ ] Regular dependency updates

### GDPR Compliance

**User Rights**:
- [ ] Data export (JSON download)
- [ ] Data deletion (account deletion)
- [ ] Right to access (view all data)
- [ ] Privacy policy page
- [ ] Cookie consent banner

---

## Testing Strategy

### Testing Pyramid

**Unit Tests** (60%):
- Reconciliation algorithm
- Matching logic
- Calculation functions
- API route handlers

**Integration Tests** (30%):
- OAuth flows
- API integrations (Shopify, Stripe, QB)
- Database operations
- Background jobs

**E2E Tests** (10%):
- Critical user flows:
  1. Sign up → Connect integrations → See first sync
  2. View reconciliation → Approve → Check QB
  3. Subscribe → Payment → Access granted

### Testing Tools

- **Unit/Integration**: Jest + React Testing Library
- **E2E**: Playwright
- **API Testing**: Postman/Insomnia collections
- **Load Testing**: k6 (post-launch)

### Test Coverage Goals

- Functions: >70%
- Critical paths: 100%
- Edge cases documented

---

## Performance Requirements

### Load Time Targets

- **Landing page**: <1.5 seconds (LCP)
- **Dashboard**: <2 seconds (first load)
- **API responses**: <200ms (p95)
- **Sync job**: <5 minutes for 1000 orders

### Optimization Strategies

**Frontend**:
- Server-side rendering (Next.js)
- Image optimization (next/image)
- Code splitting
- CDN delivery (Vercel Edge)

**Backend**:
- Database query optimization (indexes)
- Caching (React Query, Redis later)
- Pagination (100 items per page)
- Background jobs for heavy lifting

**Database**:
- Indexes on foreign keys
- Indexes on frequently queried columns (date, status)
- Connection pooling (Prisma)

---

## Deployment & DevOps

### Environments

**Development**:
- Local: localhost:3000
- Database: Local PostgreSQL or Supabase dev

**Staging**:
- URL: staging.flowreconcile.com
- Database: Supabase staging
- Integrations: Sandbox accounts

**Production**:
- URL: app.flowreconcile.com
- Database: Supabase production
- Integrations: Live accounts
- Monitoring: Full

### CI/CD Pipeline

```
Git Push to main
  ↓
GitHub Actions
  ├─ Run tests
  ├─ Type check (TypeScript)
  ├─ Lint (ESLint)
  └─ Build
  ↓
Deploy to Vercel (Staging)
  ↓
Manual approval
  ↓
Deploy to Vercel (Production)
```

### Monitoring & Alerts

**Error Tracking** (Sentry):
- Frontend errors
- API errors
- Background job failures
- Alert: Slack notification

**Analytics** (PostHog):
- User behavior
- Feature usage
- Conversion funnel

**Uptime** (Better Uptime):
- API health checks
- Page load monitoring
- Alert: Email + Slack

---

## Launch Checklist

### Week Before Launch

- [ ] All MVP features complete
- [ ] Tested with 5 beta users
- [ ] Critical bugs fixed
- [ ] Performance optimized
- [ ] Security audit complete
- [ ] Terms of Service written
- [ ] Privacy Policy written
- [ ] Support email set up
- [ ] Billing tested (test mode)

### Launch Day

- [ ] Switch to production mode
- [ ] Enable monitoring
- [ ] Launch landing page
- [ ] Submit Shopify app
- [ ] Announce on social media
- [ ] Email validation list
- [ ] Post in communities
- [ ] Monitor for errors

### Week After Launch

- [ ] Respond to all support tickets
- [ ] Fix critical bugs
- [ ] Gather user feedback
- [ ] Plan V1.1 improvements
- [ ] Optimize based on analytics

---

## MVP Scope Summary

### In Scope (Must Build)

✅ User authentication (Clerk)
✅ Shopify OAuth integration
✅ Stripe OAuth integration
✅ QuickBooks OAuth integration
✅ Initial data sync (90 days)
✅ Daily scheduled sync
✅ Reconciliation matching algorithm
✅ Journal entry creation in QB
✅ Dashboard with status
✅ Reconciliation review/approval
✅ Subscription billing (Stripe)
✅ Basic error handling

### Out of Scope (V2+)

❌ WooCommerce, BigCommerce
❌ PayPal, Square integrations
❌ Multi-currency (beyond USD)
❌ Multi-store management
❌ Team collaboration
❌ Advanced analytics
❌ AI categorization
❌ Mobile app
❌ API access
❌ White-label

---

## Development Timeline

### Week 1-2: Foundation
- Project setup (Next.js, Tailwind, Prisma)
- Database schema
- Authentication (Clerk integration)
- Basic pages (landing, dashboard, login)

### Week 3-4: Integrations
- Shopify OAuth
- Stripe OAuth
- QuickBooks OAuth
- Connection status UI

### Week 5-6: Data Sync
- Fetch data from APIs
- Store in database
- Background jobs (Inngest)
- Progress tracking

### Week 7-8: Reconciliation
- Matching algorithm
- Calculation logic
- Journal entry creation
- Review/approval UI

### Week 9-10: Billing & Polish
- Stripe subscription
- Plan selection
- Trial management
- UI polish

### Week 11: Testing
- Unit tests
- Integration tests
- E2E tests
- Bug fixes

### Week 12: Launch Prep
- Beta testing
- Documentation
- Final fixes
- Deploy

---

## Success Metrics (MVP)

### Technical Metrics

- 99% uptime
- <200ms API response time
- <5% error rate
- 95%+ match accuracy

### Product Metrics

- 60%+ trial activation (connect all 3 integrations)
- 30%+ trial → paid conversion
- <10% churn (first 90 days)
- 8/10 NPS (Net Promoter Score)

### Business Metrics

- 10 paying customers by Month 3
- $1,500 MRR
- $250 CAC
- 1.5:1 LTV:CAC (improving to 12:1 over time)

---

## Post-MVP Roadmap

### V1.1 (Month 4-5)
- Multi-currency support
- PayPal integration
- Improved error handling
- Reconciliation reports (PDF)

### V1.2 (Month 6-7)
- WooCommerce support
- Multi-store management
- Custom mapping rules
- Automated customer emails

### V2.0 (Month 8-12)
- Analytics dashboard (profit by SKU)
- AI-powered categorization
- Cash flow forecasting
- Team collaboration
- API access for agencies

---

**This spec is ready to build. Time to code.** 🚀
