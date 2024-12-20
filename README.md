## Overall Code Structure
```
mern-swift-bank/
├── frontend/
├── backend/
```

## Frontend
```
frontend/
├── node_modules/          # Project dependencies
├── public/                 # Static assets (e.g., favicon)
├── src/                    # Source code
│   ├── assets/             # Images, fonts, etc.
│   ├── pages/               # React components for each page
│   │   ├── AdminDashboard.tsx # Admin dashboard page
│   │   ├── Dashboard.tsx     # User dashboard page
│   │   ├── Login.tsx         # Login page
│   │   ├── Notifications.tsx # Notifications page
│   │   ├── Profile.tsx       # User profile page
│   │   ├── ReceiveMoney.tsx  # Receiving money page
│   │   ├── SendMoney.tsx     # Sending money page
│   │   ├── SignUp.tsx        # Sign-up page
│   │   ├── TransactionHistory.tsx # Transaction history page
│   │   └── Transactions.tsx  # Transactions page (if different from history)
│   ├── store/               # State management (Zustand)
│   │   └── user.ts          # User-related state logic
│   ├── App.css             # Global styles
│   ├── App.tsx             # Main application component
│   ├── index.css            # Entry point styles
│   ├── main.tsx            # Entry point script
│   └── vite-env.d.ts       # Vite environment type declarations
├── .gitignore              # Files to ignore by Git
├── eslint.config.js       # ESLint configuration
├── index.html             # Main HTML file
├── package-lock.json       # Locked dependency versions
├── package.json            # Project metadata and dependencies
├── postcss.config.js      # PostCSS configuration
├── README.md              # Project documentation
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.app.json       # TypeScript configuration for the app
├── tsconfig.json           # Base TypeScript configuration
└── tsconfig.node.json      # TypeScript configuration for Node.js
```

## Backend
```
backend/
├── config/
│   └── db.js                // MongoDB connection configuration
├── controller/              // Controllers handle request processing
├── middleware/
│   └── auth.js              // Middleware for authentication handling
├── models/                  // Mongoose schemas for database collections
│   ├── transaction.model.js // Schema for transactions
│   └── user.model.js        // Schema for users
├── routes/                  // Route handlers for API endpoints
├── services/                // Service layer for business logic
│   └── transaction.service.js // Transaction-related logic
└── server.js                // Entry point for the backend server


```
