# 🤖 Gemini Chat App (Next.js + Docker)

A **ChatGPT-style AI web application** built with **Next.js 15**, **TypeScript**, and **Google Gemini API**, running entirely inside **Docker** — no Node.js installation required on your system.

---

## ✨ Features

- 💬 Chat interface powered by **Google Gemini 2.0 Flash** model  
- 🐳 **Dockerized** — run anywhere without local Node.js  
- ⚡ Built with **Next.js App Router** and **React Hooks**  
- 🔐 API key environment variable for secure Gemini access  
- 🧠 Simple, clean UI with instant AI replies  
- 📦 Easy to deploy on **Vercel**, **Render**, or your own server  

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | Next.js 15, React, TypeScript |
| Backend | Node.js, Google Generative AI SDK (`@ai-sdk/google`) |
| Styling | Tailwind / Inline CSS |
| Deployment | Docker |
| AI Model | Gemini 2.0 Flash (via Google AI Studio API) |

---

## 🧰 Prerequisites

- [Docker Desktop](https://www.docker.com/get-started)
- [Google AI Studio API Key](https://aistudio.google.com/app/apikey)

> 🧠 You can get your free Gemini API key by signing in to **Google AI Studio** → **Get API key** → copy the key.

---

## ⚙️ Setup Instructions

### 1️⃣ Clone this repository
```bash
git clone https://github.com/YOUR-USERNAME/gemini-chat-docker.git
cd gemini-chat-docker

### 2️⃣ Create .env.local file
'''bash
GOOGLE_GENERATIVE_AI_API_KEY="your_api_key_here"

3️⃣ Build Docker image
'''bash
docker build -t gemini-chat-app .

4️⃣ Run the container
'''bash 
docker run -it -p 3000:3000 -e GOOGLE_GENERATIVE_AI_API_KEY="your_api_key_here" gemini-chat-app

5️⃣ Open the app

Visit 👉 http://localhost:3000

You’ll see your AI chat interface running locally inside Docker 🎯

📂 Project Structure
my-app/
 ├── app/
 │   ├── api/chat/route.ts   # Backend route (Gemini API handler)
 │   └── page.tsx            # Frontend chat interface
 ├── .env.local              # API key (not pushed to GitHub)
 ├── Dockerfile              # Docker build config
 ├── package.json
 └── README.md

🧱 Dockerfile Overview
FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

🧩 Example API Route (.ts file) 
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function POST(req: Request) {
  const { messages } = await req.json();
  const prompt = messages.map((m: any) => m.content).join("\n");

  const { text } = await generateText({
    model: google("gemini-2.0-flash"),
    prompt,
  });

  return new Response(JSON.stringify({ text }), {
    headers: { "Content-Type": "application/json" },
  });
}

🛡️ Security Note

Never commit your .env.local file or API key.

.gitignore already includes .env* so you’re safe.

Use -e GOOGLE_GENERATIVE_AI_API_KEY="..." for secure runtime injection.

### Screenshot
This is there in /public/screenshot.png
