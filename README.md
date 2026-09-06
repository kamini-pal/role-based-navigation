# Role-Based Navigation System

A professional **React + Vite** application demonstrating role-based access control (RBAC) with dynamic sidebar navigation, permission-gated UI components, full CRUD operations, and a clean interview-ready architecture.

---

## 🚀 Features

- ✅ **Dynamic Sidebar** — auto-generated from API permission data; hides unauthorized modules
- ✅ **Protected Routes** — route-level access control using `ProtectedRoute` + `hasPermission()`
- ✅ **Permission-Gated Buttons** — Create / Edit / Delete only show for roles with the right permission
- ✅ **Orders Management** — full CRUD: Create, Edit, Delete with confirmation dialog
- ✅ **Form Validation** — field-level inline validation with real-time error clearing
- ✅ **Search & Filter** — search by customer name or order ID; filter by status
- ✅ **Empty State** — friendly message when no orders match filters
- ✅ **Professional UI** — dark sidebar, stat cards, status badges, animated modals
- ✅ **Responsive Layout** — works on mobile, tablet, and desktop

---

## 🔐 Permission Architecture

Permissions follow the exact API shape from the assignment:

```json
{
  "modules": [
    { "name": "Orders",  "permission": ["VIEW", "CREATE", "EDIT", "DELETE"] },
    { "name": "Billing", "permission": ["VIEW"] }
  ]
}
```

### How It Works

```
AuthContext
  └── permissions (from mockPermission.js / API)
        └── hasPermission(moduleName, action)
              ├── ProtectedRoute  →  guards entire routes (VIEW check)
              └── JSX condition   →  guards individual buttons (CREATE / EDIT / DELETE)
```

**`hasPermission(moduleName, action)`** — looks up the module by name and checks if the action is in its permission array. Used in two places:
1. `ProtectedRoute` — checks `VIEW` before rendering the route at all
2. Inside page components — conditionally renders Create / Edit / Delete buttons

---

## 👤 User Roles

| Role   | Orders                       | Billing |
|--------|------------------------------|---------|
| Admin  | VIEW, CREATE, EDIT, DELETE   | VIEW    |
| Viewer | *(no access)*                | VIEW    |

**Login**: select the role from the dropdown on the Login page — no password needed (mock auth).

---

## 📁 Project Structure

```
src/
├── context/
│   └── AuthContext.jsx        # login, logout, hasPermission
├── data/
│   ├── mockPermission.js      # admin permission data (API shape)
│   └── mockOrders.js          # 8 mock orders dataset
├── components/
│   ├── ProtectedRoute.jsx     # auth + VIEW permission guard
│   └── layout/
│       ├── layout.jsx         # sidebar + outlet wrapper
│       └── sidebar.jsx        # dynamic nav from permissions
├── pages/
│   ├── Login.jsx              # role selector login
│   ├── Dashboard.jsx          # landing page after login
│   ├── Order.jsx              # full CRUD + search/filter
│   ├── Billing.jsx            # view-only billing page
│   └── Unothorized.jsx        # access denied page
├── App.jsx                    # BrowserRouter + Routes
├── index.css                  # all styles (vanilla CSS)
└── main.jsx                   # app entry, wraps AuthProvider
```

---

## ⚙️ Setup & Running

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9

### Steps

```bash
# 1. Clone the repo
git clone <repo-url>
cd role-based-navigation

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev

# 4. Open in browser
# http://localhost:5173
```

### Build for Production

```bash
npm run build
```

---

## 🧪 Manual Testing Guide

### Admin Role
1. Select **Admin (All Access)** → Sign In
2. Sidebar shows: Dashboard, Orders, Billing
3. Navigate to **Orders**:
   - **Create**: Click "+ Create Order" → fill form → submit → new row appears at top
   - **Edit**: Click "Edit" on any row → modify fields → "Update Order" → row updates
   - **Delete**: Click "Delete" → confirm dialog appears → confirm → row removed
   - **Search**: Type customer name or order ID in the search bar
   - **Filter**: Select a status from the dropdown
   - **Empty State**: Filter to a status with no results → shows empty message

### Viewer Role
1. Select **Viewer (Billing Only)** → Sign In
2. Sidebar shows: Dashboard, Billing only
3. Try navigating to `/orders` → redirected to **Access Denied** page
4. Billing page shows (VIEW only, no edit controls)

---

## 📐 Architecture Decisions (Interview-Ready)

| Decision | Rationale |
|----------|-----------|
| Single `AuthContext` | One source of truth for user, permissions, `hasPermission()` |
| `hasPermission(module, action)` | Reusable function, decouples permission logic from UI |
| `ProtectedRoute` wraps routes | Keeps `App.jsx` clean; route protection is declarative |
| `useState` for orders | No backend; simple and easy to explain; swap for API call later |
| Vanilla CSS | No external dependencies; demonstrates pure CSS skills |
| Mock data matches API shape | `mockPermission.js` mirrors the exact JSON from the assignment |

---

## 📸 Screenshots

> _Add screenshots after running the project_

| Page | Description |
|------|-------------|
| Login | Role selector with clean card layout |
| Dashboard | Stats overview |
| Orders | Table with search, filter, CRUD buttons |
| Create Order Modal | Animated modal with form validation |
| Delete Confirmation | Confirmation dialog before deleting |
| Access Denied | Unauthorized page for blocked routes |
