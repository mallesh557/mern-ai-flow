MERN AI Flow App

 Project Overview

This is a full-stack MERN application where users can input a prompt, send it to an AI model, and view the response using a visual flow interface.

---
 Features

 Interactive UI using React Flow
 AI response generation via API
 Backend API with Node.js & Express
 Save prompt & response to MongoDB
 Full-stack integration

---

 Tech Stack

* Frontend: React (Vite), React Flow
* Backend: Node.js, Express
* Database: MongoDB Atlas
* API: OpenRouter
* Deployment: Vercel, Render

---

 Folder Structure

mern-ai-flow/
│
├── client/   (React frontend)
├── server/   (Node backend)
├── README.md
├── .gitignore

---

 Setup Instructions

 1. Clone Repo

git clone https://github.com/your-username/mern-ai-flow.git

---

 2. Backend Setup

cd server
npm install

Create `.env`:
OPENROUTER_API_KEY=your_key
MONGO_URI=your_mongodb_url

Run:
node server.js

---

 3. Frontend Setup

cd client
npm install
npm run dev

---

 API Endpoints

 POST /api/ask-ai

Send prompt and get AI response

 POST /api/save

Save prompt & response to database

---

 Deployment

* Frontend → Vercel
* Backend → Render
* Database → MongoDB Atlas

---

 Resume Highlight

Built a full-stack MERN AI application with real-time API integration and database storage.

---


