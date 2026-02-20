# Specification

## Summary
**Goal:** Configure the currently logged-in Internet Identity user as super admin with full access rights to the admin dashboard.

**Planned changes:**
- Capture the authenticated principal from the current Internet Identity session
- Add backend method to set/update super admin principal with authorization checks
- Store super admin principal in stable storage for persistence across upgrades
- Update frontend AdminGuard to recognize and grant access to super admin
- Add comprehensive console logging for principal IDs and authentication status throughout the flow

**User-visible outcome:** After logging in with Internet Identity, the user is automatically configured as super admin and gains immediate access to all admin dashboard features without restrictions.
