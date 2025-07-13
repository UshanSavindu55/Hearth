🧠 Hearth – Your AI-Powered Mental Health Chatbot

📌 What’s Hearth?
Hearth is a chatbot I built to support people going through tough times with their mental health. It’s designed to have real conversations, pick up on how you’re feeling, and respond with kindness and understanding. If things get serious, it can also guide you to helpful resources or escalate the conversation.
This project has been a great learning experience for me — combining AI, backend development, and frontend design — and I’m excited to keep making it better.
Right now, Hearth uses OpenAI’s language model to understand and respond, but I’m planning to add other smart tools like Hugging Face and Cohere to improve how it detects emotions and crisis situations.

✨ What Hearth Can Do
🔐 Secure login with Spring Security and JWT to keep your info safe

💬 Chat with an AI that listens and responds with empathy

😔 Understand emotional tones to better support you

🚨 Plan to add crisis detection and escalation for urgent help

💾 Save your conversation history safely in PostgreSQL

🌐 Responsive chat interface that works smoothly on any device

📦 Clean and modular backend so I can easily add new AI features

🛠️ Tech Behind the Scenes

Backend	- Java, Spring Boot, Spring Security, JWT
Frontend - React.js, HTML, CSS, JavaScript
Database - PostgreSQL (self-hosted or cloud-based)
AI APIs	OpenAI (today), Hugging Face & Cohere (soon)
Tools - Postman, IntelliJ IDEA

🧠 How AI Powers Hearth
When you chat with Hearth, your messages are sent to OpenAI’s API where:

It picks up on your emotional tone and mood

Crafts thoughtful, empathetic replies

Keeps the focus on mental health support

🔮 What’s Next?
Add Hugging Face models for even better emotion recognition

Bring in Cohere to spot crises and important intents more accurately

🧩 How the Project is Organized
graphql
Copy
Edit
hearth-chatbot/
├── backend/        # Spring Boot REST API  
├── frontend/       # React chat interface  
├── db/             # PostgreSQL setup and migrations  
├── docs/           # API details and prompt designs  
└── README.md       # This file  
📚 What I’ve Learned
Building secure, scalable backend services with Spring Boot

Integrating powerful AI APIs like OpenAI

Crafting prompts to get sensitive, thoughtful AI responses

Designing smooth, responsive user interfaces with React

Storing user chats safely using PostgreSQL

Tackling real-world issues like safety, escalation, and ethical AI use

🚀 What’s Coming Up
Better emotion detection with Hugging Face

Smarter crisis detection using Cohere

Feedback loops to improve conversations over time

Multilingual support so more people can use Hearth

Accessibility improvements to make Hearth welcoming for everyone

🧑‍💻 Ready to Try Hearth?
Clone this repo

Set up the backend with Spring Boot and connect PostgreSQL

Start the React frontend

Add your OpenAI API key to .env or application.properties

Start chatting with Hearth and feel heard!