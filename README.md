# Live Race Leaderboard

A real-time race tracking dashboard built with React, TypeScript, and WebSocket.


## Features

### 🔌 WebSocket Connection & Status
- Connects to the WebSocket server on mount and displays live connection status in the UI
- Visual indicator updates immediately on connect/disconnect

### 🏆 Leaderboard UI
- Athletes rendered in a **CSS Grid** layout
- Displays relevant race data per athlete in a clean, scannable format

### ⚠️ Error Handling & Dirty Data
- Incomplete records (e.g. missing country code) are handled gracefully with **N/A** fallbacks in the UI
- `try/catch` blocks ensure parsing failures do not interrupt normal application flow

### 🔷 Type Safety
- TypeScript type definitions introduced across both **client** and **server**
- Reduces runtime errors and improves developer confidence when handling live data

### 📏 Gap to Leader
- **1st place**: displays `"Leader"` in the Gap column
- **All others**: calculates and displays the distance behind the leader in metres 

### 📡 Push to Air
- Each athlete row includes a **PUSH GRAPHIC** button
- Simulates dispatching a lower-third graphic to an external graphics engine

### ⏯️ Race Toggle
- A **TOGGLE_RACE** control added to the dashboard
- Sends a `TOGGLE_RACE` command to the server via WebSocket to pause or resume race data generation

### ⚡ Performance
- `React.memo()` prevents unnecessary re-renders of athlete rows when their data has not changed
- `useCallback` stabilises event handler references passed as props

---

## Tech Stack

| Area       | Technology            |
|------------|-----------------------|
| Frontend   | React, TypeScript     |
| Styling    | CSS Grid              |
| Real-time  | WebSocket (native API)|