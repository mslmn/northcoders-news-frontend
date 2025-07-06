# 📰 NC News (Frontend)

🚀 **Live site:** [https://nc-news-ms.netlify.app](https://nc-news-ms.netlify.app)

This is the frontend for the **NC News** app — a Reddit-style news aggregator.

Built with **React** and styled using **Tailwind CSS** + **DaisyUI**, it connects to a custom **Express.js** backend API to deliver articles, comments, and user interaction features.

## ✨ Features

- 🗂 Browse articles by topic
- 🔼 Upvote and 🔽 downvote articles
- 💬 View and post comments
- 📱 Fully responsive UI
- 🚦 Client-side routing with React Router

## 🧰 Tech Stack

- ⚛️ React
- ⚡ Vite
- 🧭 React Router DOM
- 🎨 Tailwind CSS + DaisyUI
- 🖥 Express.js backend (external API)

## 🛠 Getting Started

### Prerequisites

Ensure you have **Node.js** and **npm** installed.

### Installation

```bash
git clone https://github.com/mslmn/nc-news.git
cd nc-news
npm install
```

### Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

## 🌐 API Reference

This app communicates with a RESTful **Express.js** backend:

**Base URL:** [https://nc-news-app-api.onrender.com/api](https://northcoders-news-gida.onrender.com/api)

Example endpoints:

- `GET /articles`
- `GET /articles/:article_id`
- `GET /topics`
- `POST /articles/:article_id/comments`
