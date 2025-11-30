# Tap Academy Project

## Overview
This project is a full-stack web application consisting of a React frontend and an Express/Node.js backend. It includes features for authentication, attendance tracking, and dashboard reporting.

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher recommended)
- MongoDB (Local or Atlas)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nithinmouli/tap-acadameny.git
   cd "tap acadameny"
   ```

2. **Install Server Dependencies:**
   ```bash
   cd server
   npm install
   ```

3. **Install Client Dependencies:**
   ```bash
   cd ../client
   npm install
   ```

## Environment Variables

You need to set up environment variables for both the server and the client.

### Server
Create a `.env` file in the `server/` directory with the following variables:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/your_database_name
JWT_SECRET=your_jwt_secret_key
```

### Client
Create a `.env` file in the `client/` directory with the following variables:

```env
VITE_API_URL=http://localhost:5000/api
```

## How to Run

1. **Start the Server:**
   Open a terminal and run:
   ```bash
   cd server
   npm run dev
   ```
   The server will start on `http://localhost:5000` (or your specified PORT).

2. **Start the Client:**
   Open a new terminal and run:
   ```bash
   cd client
   npm run dev
   ```
   The client will start on `http://localhost:5173` (default Vite port).

## Project Structure
- `client/`: React frontend application (Vite)
- `server/`: Express backend application