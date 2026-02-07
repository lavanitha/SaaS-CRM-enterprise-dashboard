# SaaS CRM Enterprise Dashboard

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node.js](https://img.shields.io/badge/node.js-v20.15.1-green)
![React](https://img.shields.io/badge/react-18.3.1-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/typescript-5.5.3-3178c6?logo=typescript)
![Express.js](https://img.shields.io/badge/express.js-5.2.1-000000?logo=express)
![MongoDB](https://img.shields.io/badge/mongodb-9.1.1-13aa52?logo=mongodb)
![Vite](https://img.shields.io/badge/vite-5.4.2-646cff?logo=vite)
![Status](https://img.shields.io/badge/status-active-success)

A modern, full-stack SaaS Customer Relationship Management (CRM) dashboard built with React, TypeScript, Node.js, and MongoDB. Designed for enterprise-level analytics, sales pipeline management, and business intelligence.

[Features](#features) • [Tech Stack](#tech-stack) • [Installation](#installation) • [Usage](#usage) • [Project Structure](#project-structure)

</div>

---

## 📋 Overview

The **SaaS CRM Enterprise Dashboard** is a comprehensive customer relationship management system designed for modern businesses. It provides real-time analytics, sales pipeline management, customer insights, and revenue forecasting in an intuitive, responsive interface.

Whether you're managing a small sales team or scaling an enterprise operation, this dashboard offers the tools you need to drive growth and build lasting customer relationships.

---

## ✨ Features

### 📊 Analytics & Reporting
- **Real-time Dashboard** - KPI cards with total orders, customers, revenue, and returning customer metrics
- **Revenue Analytics** - Advanced revenue tracking and forecasting capabilities
- **Customer Analytics** - Detailed customer journey and segmentation analysis
- **Sales Pipeline** - Visual deal progression and sales funnel management

### 👥 Customer Management
- **Top Customers Table** - Identify and track your most valuable customers
- **Customer Journey Tracking** - Monitor customer interactions and touchpoints
- **Customer Segmentation** - Organize customers by behavior and value

### 💼 Sales Tools
- **Deal Progression** - Track deals through multiple stages
- **Forecast Management** - Project future revenue based on current pipeline
- **Order Management** - Complete order lifecycle management

### 🎨 User Experience
- **Modern UI/UX** - Clean, professional interface with intuitive navigation
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Dark Mode Ready** - Tailwind CSS integration for theme customization
- **Real-time Data** - Live updates from MongoDB backend

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18.3.1 | UI library |
| TypeScript | 5.5.3 | Type safety |
| Vite | 5.4.2 | Build tool & dev server |
| React Router | 7.11.0 | Client-side routing |
| Tailwind CSS | 3.4.1 | Styling |
| Recharts | 3.6.0 | Data visualization |
| Lucide React | 0.344.0 | Icon library |
| Axios | 1.13.2 | HTTP client |

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Node.js | 20.15.1 | Runtime environment |
| Express.js | 5.2.1 | Web framework |
| MongoDB | 9.1.1 | Database |
| Mongoose | 9.1.1 | ODM |
| CORS | 2.8.5 | Cross-origin requests |
| Dotenv | 17.2.3 | Environment variables |
| Nodemon | 3.1.11 | Dev server auto-reload |

---

## 🚀 Installation

### Prerequisites
- **Node.js** v20.15.1 or higher
- **npm** v10.7.0 or higher
- **MongoDB** (local or cloud instance)

### Setup Instructions

1. **Clone the Repository**
```bash
git clone https://github.com/lavanitha/SaaS-CRM-enterprise-dashboard.git
cd SaaS-CRM-enterprise-dashboard
```

2. **Backend Setup**
```bash
cd crm-backend
npm install

# Create .env file
echo "PORT=5000" > .env
echo "MONGO_URI=mongodb://127.0.0.1:27017/crm_saas" >> .env

# Seed the database
node src/seed/seedData.js

# Start the development server
npm run dev
```

3. **Frontend Setup**
```bash
# From the project root
npm install

# Start Vite dev server
npm run dev
```

4. **Access the Application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

---

## 📖 Usage

### Available Scripts

#### Frontend
```bash
npm run dev      # Start Vite development server
npm run build    # Build for production
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
npm run typecheck # TypeScript type checking
```

#### Backend
```bash
npm run start    # Start production server
npm run dev      # Start with nodemon (auto-reload)
```

### API Endpoints

#### Dashboard
- `GET /api/dashboard/stats` - Get KPI metrics and recent orders

#### Orders
- `GET /api/orders` - List all orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id` - Update order
- `DELETE /api/orders/:id` - Delete order

---

## 📁 Project Structure

```
SaaS-CRM-enterprise-dashboard/
├── README.md
├── package.json
├── index.html
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
│
├── src/                          # Frontend (React + TypeScript)
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── vite-env.d.ts
│   ├── api/
│   │   └── dashboardApi.ts       # API calls
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Header.tsx        # Top navigation bar
│   │   │   └── Sidebar.tsx       # Side navigation
│   │   ├── auth/
│   │   │   └── LoginModal.tsx
│   │   ├── UI/
│   │   │   ├── KPICard.tsx       # Key metric cards
│   │   │   ├── ChartCard.tsx     # Chart wrapper
│   │   │   └── DataTable.tsx     # Reusable table
│   │   ├── sales/
│   │   │   ├── DealProgressionTable.tsx
│   │   │   └── RevenueForecast.tsx
│   │   └── customers/
│   │       └── TopCustomersTable.tsx
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── SalesPipeline.tsx
│   │   ├── CustomerAnalytics.tsx
│   │   ├── RevenueAnalytics.tsx
│   │   └── Login.tsx
│   └── data/
│       └── mockData.ts
│
└── crm-backend/                  # Backend (Node.js + Express)
    ├── package.json
    ├── .env
    ├── src/
    │   ├── server.js             # Entry point
    │   ├── app.js                # Express app
    │   ├── config/
    │   │   └── db.js             # MongoDB connection
    │   ├── models/
    │   │   ├── Order.js          # Order schema
    │   │   └── Customer.js       # Customer schema
    │   ├── controllers/
    │   │   ├── dashboardController.js
    │   │   └── orderController.js
    │   ├── routes/
    │   │   └── dashboardRoutes.js
    │   └── seed/
    │       └── seedData.js       # Sample data generator
```

---

## 🗄️ Database Schema

### Orders Collection
```javascript
{
  _id: ObjectId,
  orderId: String (unique),
  customerName: String,
  customerEmail: String,
  product: String,
  amount: Number,
  status: String, // "Completed", "Processing", "Pending"
  date: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Customers Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  totalOrders: Number,
  totalSpent: Number,
  isReturning: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔧 Configuration

### Environment Variables

**.env** (Backend)
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/crm_saas
```

### Vite Configuration
- **Dev Server**: http://localhost:5173
- **API Base URL**: http://localhost:5000
- **Build Output**: `dist/`

---

## 📊 Key Components

### Dashboard Page
Displays real-time KPIs including:
- Total Orders
- Total Customers
- Total Revenue
- Returning Customer Percentage
- Recent Orders Table

### Sales Pipeline
Visual representation of deals and their progression through sales stages.

### Customer Analytics
Comprehensive customer data including:
- Customer lifecycle metrics
- Purchase history
- Segmentation analysis
- Customer journey visualization

### Revenue Analytics
Advanced revenue tracking with:
- Revenue trends
- Forecast projections
- Revenue by product/segment
- Period-over-period comparison

---

## 🔌 REST API

### Health Check
```bash
curl http://localhost:5000
```

### Get Dashboard Stats
```bash
curl http://localhost:5000/api/dashboard/stats
```

Response:
```json
{
  "kpis": {
    "totalOrders": 5,
    "totalCustomers": 2,
    "totalRevenue": 31200,
    "returningPercentage": 50
  },
  "recentOrders": [
    {
      "_id": "...",
      "orderId": "ORD-1005",
      "customerName": "Alice Brown",
      "amount": 8900,
      "status": "Pending"
    }
  ]
}
```

---

## 📦 Deployment

### Frontend Deployment (Vercel, Netlify)
```bash
npm run build
# Deploy the 'dist' folder
```

### Backend Deployment (Heroku, Railway, Render)
```bash
# Push to your hosting platform with:
# - PORT environment variable
# - MONGO_URI connection string
```

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2026 SaaS CRM Enterprise Dashboard

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
```

---

## 🙋 Support

For support, email support@saascrm.com or open an issue on GitHub.

---

## 🎯 Roadmap

- [ ] Advanced analytics with custom date ranges
- [ ] User authentication and multi-tenancy
- [ ] Email notifications
- [ ] Bulk import/export
- [ ] Integration with payment gateways
- [ ] Mobile app (React Native)
- [ ] Real-time collaboration features
- [ ] AI-powered insights

---

## 👨‍💼 Author

**SaaS CRM Development Team**
- GitHub: [@lavanitha](https://github.com/lavanitha)
- Repository: [SaaS-CRM-enterprise-dashboard](https://github.com/lavanitha/SaaS-CRM-enterprise-dashboard)

---

<div align="center">

**[⬆ back to top](#saas-crm-enterprise-dashboard)**

Made with ❤️ by the SaaS CRM Team

</div>
