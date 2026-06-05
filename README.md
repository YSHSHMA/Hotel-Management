# 🏨 HBM - Hotel Management System

HBM is a modern hotel booking and management platform that connects travelers with hotels, resorts, and accommodations worldwide.

The platform provides hotel discovery, room booking, reservation management, destination exploration, business insights, and hotel administration features through a seamless user experience.

<table>
<tr>
<td align="center" width="50%">

### 🔍 Hotel Search & Discovery
Explore hotels, resorts, and accommodations across various destinations.

</td>
<td align="center" width="50%">

### 🛏️ Room Booking
Book rooms instantly with real-time availability and reservation management.

</td>
</tr>

<tr>
<td align="center">

### 🌍 Destination Explorer
Discover popular destinations and travel experiences worldwide.

</td>
<td align="center">

### 📅 Reservation Management
Manage upcoming stays, booking history, and cancellations.

</td>
</tr>

<tr>
<td align="center">

### 🏨 Hotel Management
Add, update, and manage hotel properties and room inventories.

</td>
<td align="center">

### 📊 Business Insights
Track bookings, revenue, and hotel performance metrics.

</td>
</tr>

<tr>
<td align="center">

### 🔐 Secure Authentication
JWT-based authentication with protected routes and role management.

</td>
<td align="center">

### 📱 Responsive Experience
Optimized experience across desktop, tablet, and mobile devices.

</td>
</tr>
</table>

---

## Landing Page

![Homepage](./screenshots/banner.png)

---

# 🏗️ Tech Stack

| Layer | Technology |
|---------|------------|
| Frontend | React + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Backend | Node.js + Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| Authentication | JWT |
| Containerization | Docker |
| Orchestration | Docker Compose |

---

# 🚀 Features

## Customer Features

- Hotel Search & Discovery
- Room Booking System
- Destination Browsing
- Booking History
- Reservation Management
- Responsive User Experience

---

## Hotel Owner Features

- Hotel Management
- Room Management
- Booking Monitoring
- Occupancy Tracking
- Revenue Analytics
- Business Dashboard

---

## Security Features

- JWT Authentication
- Protected Routes
- Role-Based Authorization
- Secure REST APIs

---

# 🐳 Docker Setup

## Prerequisites

- Docker
- Docker Compose

Verify installation:

```bash
docker --version
docker compose version
```

---

## Start Containers

```bash
docker compose up -d
```

Build again if required:

```bash
docker compose up -d --build
```

Check running containers:

```bash
docker ps
```

---

## Stop Containers

```bash
docker compose down
```

---

# 🌐 Application URLs

| Service | URL |
|----------|------|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:7000 |
| MongoDB | mongodb://localhost:27017 |

---

# 🗄️ Environment Variables

## Backend

```env
PORT=7000

MONGODB_URI=mongodb://mongo:27017/hotel-management

JWT_SECRET=your-secret-key
```

## Frontend

```env
VITE_API_URL=http://localhost:7000/api
```

---

# 💻 Local Development

## Frontend

```bash
npm install
npm run dev
```

---

## Backend

```bash
npm install
npm run dev
```

---

# 📦 Production Build

## Frontend

```bash
npm run build
```

## Backend

```bash
npm run build
npm start
```

---

# 📊 Core Modules

- Authentication System
- Hotel Management
- Room Management
- Booking Management
- Destination Explorer
- Business Insights Dashboard
- Revenue Analytics
- Reservation Tracking

---

# 🤝 Contributing

1. Fork repository

2. Create feature branch

```bash
git checkout -b feature/new-feature
```

3. Commit changes

```bash
git commit -m "Add new feature"
```

4. Push

```bash
git push origin feature/new-feature
```

5. Create Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

## Owner

© Yash Sharma. All Rights Reserved.

For support, questions, or issue reporting:

📧 06yashsharma@gmail.com
