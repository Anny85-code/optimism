---
description: Frontend implementation plan for Investor Branding and Customer Portal.
---

### 1. Premium Investor Landing Page

- [ ] Design and implement `src/components/landing/investor/InvestorLanding.jsx`.
- [ ] Use rich aesthetics: gradients, glassmorphism, and GSAP/AOS animations.
- [ ] Highlight "Transparency", "Market Reach", and "Fintech Innovation".
- [ ] Update `App.js` to route potential investors to this page.

### 2. Standardized Auth Integration

- [ ] Update `userReducer.js` to handle `customer` role from response.
- [ ] Implement `useAuth` hook (or update Redux state) to distinguish between staff and customers.
- [ ] Update `localStorage` handling to include role-based session persistence.

### 3. Customer Read-Only Portal

- [ ] Create `src/components/portal/CustomerDashboard.jsx`.
- [ ] View: Total Contributions (Read-only).
- [ ] View: Timeline of payments using `V2Transactions`.
- [ ] View: Items tracker (what they are saving for).
- [ ] Disable all "Add", "Edit", or "Delete" actions for the `customer` role.

### 4. Role-Based Navigation & Routing

- [ ] Update `Sidebar.jsx` and `Navbar.jsx` to show limited menu items for customers.
- [ ] Implement Route Guards in `App.js` to prevent customers from accessing admin/marketer routes.

### 5. Visual Polish & SEO

- [ ] Optimize images for the marketing page.
- [ ] Add meta tags for investor presentations.
- [ ] Verify responsiveness across all devices for the new portal.
