# 🚗 ParkWise – Smart Campus Parking Management System

## 📌 Overview

ParkWise is an AI-powered Smart Campus Parking Management System developed to simulate and optimize parking operations inside a university campus environment.

The system provides:

- Real-time parking occupancy monitoring
- AI-based vehicle detection simulation
- Smart parking allocation using shortest-path logic
- Live analytics dashboards
- Automated traffic simulation
- Smart congestion alerts
- Interactive animated campus map
- Multi-theme modern UI

This project demonstrates practical applications of:

- Artificial Intelligence
- Smart Infrastructure
- Real-Time Systems
- Data Visualization
- Full Stack Development
- Intelligent Resource Allocation

---

# ✨ Features

## 🚦 Real-Time Parking Dashboard

- Live parking statistics
- Vehicle entry and exit tracking
- Available slot calculation
- Dynamic occupancy updates

---

## 🤖 AI Traffic Simulation

Automatically simulates:

- Vehicle inflow
- Vehicle outflow
- Occupancy changes
- Dynamic dashboard updates

Useful for live demonstrations and presentations.

---

## 📷 AI Camera Simulation

Simulates intelligent vehicle detection using image uploads.

### Workflow

1. User uploads image
2. System analyzes image
3. Vehicle presence detected
4. Parking count updated automatically

### Future Scope

Can be integrated with:

- YOLO
- OpenCV
- TensorFlow.js
- Real CCTV feeds

---

## 🧠 Smart Parking Allocation

Implements intelligent parking allocation using shortest-distance logic.

### Algorithms Used

- Greedy Allocation
- BFS Routing Logic
- Dijkstra-inspired nearest allocation

### Functionality

When a vehicle enters:

- System checks all parking zones
- Finds nearest available slot
- Allocates parking automatically
- Displays optimal route

---

## 🚨 Smart Alerts Panel

Provides real-time warnings such as:

- Parking almost full
- Zone overcrowding
- High inflow detection
- Full parking diversion alerts

---

## 🗺️ Interactive Campus Map

Features:

- Real campus layout
- Parking zones
- Entry/Exit gates
- Live occupancy markers
- Real-time vehicle counter

---

## 📊 Analytics Dashboard

### Zone Occupancy Chart
- Occupied slots
- Available slots

### Entry vs Exit Analysis
- Vehicle inflow trends
- Exit trends

### Parking Distribution Pie Chart
- Zone-wise usage distribution

---

## 🎨 Multi Theme UI

Supports:

- Dark Theme
- Light Theme
- Cyberpunk Theme

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Vite
- Axios
- Recharts
- Lucide React
- CSS3

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

---

# 🧱 System Architecture

```text
Frontend (React)
        ↓
REST API (Express.js)
        ↓
MongoDB Database
        ↓
Analytics + Simulation Engine


parkwise/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── data/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── App.css
│   │
│   └── package.json
│
└── README.md