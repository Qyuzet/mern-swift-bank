## Frontend
```
frontend/
├── public/                  # Static files (e.g., images, manifest files)
├── src/                     # Source files for the application
│   ├── pages/               # React components for different pages
│   │   ├── Login.tsx        # Login page
│   │   ├── Dashboard.tsx    # Dashboard page
│   │   ├── SendMoney.tsx    # Send money page
│   │   ├── Transactions.tsx # Transaction history page
│   ├── store/               # Zustand store for state management
│   ├── App.tsx              # Main application component
│   ├── index.tsx            # Entry point of the React application
├── package.json             # Project dependencies and scripts
├── tailwind.config.js       # Tailwind CSS configuration file
└── vite.config.ts           # Vite configuration file
```

## Backend
```
backend/
├── config/
│   └── db.js                # MongoDB connection configuration
├── middleware/
│   └── auth.js              # Middleware for authentication handling
├── models/
│   ├── user.model.js        # User schema definition
│   ├── transaction.model.js # Transaction schema definition
├── routes/                  # Route handlers for API endpoints
│   ├── auth.routes.js       # Authentication-related routes
│   ├── transaction.routes.js# Transaction-related routes
├── server.js                # Entry point for the backend server
└── package.json             # Project dependencies and scripts

```
