# 🧠 Hearth – Your AI-Powered Mental Health Chatbot

## Overview
Hearth is an AI-driven chatbot designed to support individuals navigating mental health challenges. It engages in empathetic conversations, detects emotional tones, and offers compassionate responses. In critical situations, Hearth guides users toward appropriate support and resources.

This project combines AI integration, backend development, and frontend design. Currently, Hearth leverages Cohere for natural language responses and custom Hugging Face models (served via a Python microservice) for emotion detection and mental health relevance scoring.

## ✨ Features
- Secure Login: User authentication powered by Spring Security and JWT
- Empathetic AI Chat: Responses generated via Cohere, focused on compassion and clarity
- Emotion & Relevance Detection: Uses Hugging Face models to analyze emotional tone and assess if a message is mental health–related
- Crisis Support (Upcoming): Plans for automated crisis detection and escalation
- Conversation History: Securely stores chats in a PostgreSQL database
- Responsive UI: A modern, accessible chat interface built with React.js
- Modular Architecture: Designed for easy integration of new AI services and features

## 🛠️ Technology Stack
Backend - Java, Spring Boot, Spring Security, JWT
Frontend - React.js, HTML, CSS, JavaScript
Database - PostgreSQL 
AI Backend - Cohere API, Python microservice with Hugging Face models
Tools - Postman, IntelliJ IDEA, Docker (for Python services)

## 🧠 How AI Powers Hearth
When users interact with Hearth:
1. User messages are sent to the backend.
2. The backend forwards messages to a Python microservice, which uses:
   - Hugging Face models for emotion detection
   - A custom model to check relevance to mental health
3. If the message is relevant, the backend sends it to the Cohere API, which generates a thoughtful, empathetic response.
4. The response is returned to the frontend and stored securely if logging is enabled.

## 🔮 Roadmap / What's Next
- Add automatic crisis detection and escalation
- Expand multilingual support
- Improve accessibility for screen readers and assistive tech
- Implement feedback loops to refine response quality
- Train custom models for finer-grained emotion and intent detection

## 🧩 Project Structure
```
hearth/
├── backend/        # Spring Boot REST API  
├── frontend/       # React chat interface  
├── python-service/     # Python microservice with Hugging Face models  
├── db/             # PostgreSQL setup and migrations  
├── docs/           # API documentation and prompt design  
└── README.md       # Project overview and setup instructions 
```
 
## 📚 Lessons Learned
- Designing secure, scalable services with Spring Boot
- Integrating Cohere and managing API responses for sensitive topics
- Building and deploying Python microservices with Hugging Face models
- Creating responsive, accessible UI with React
- Addressing ethical AI use, user privacy, and mental health safety concerns
- Implementing model inference pipelines to blend relevance and emotion detection before response generation

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/hearth.git
   cd hearth
   ```

2. **Set up the backend with Spring Boot**
   ```bash
   cd backend
   ./mvnw clean install
   ```

3. **Connect to PostgreSQL**
   ```bash
   # Create database
   createdb hearth_db
   
   # Update application.properties with your database credentials
   spring.datasource.url=jdbc:postgresql://localhost:5432/hearth_db
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

4. **Run the Python AI microservice for emotion/relevance detection**
   ```bash
   cd python-service
   pip install -r requirements.txt
   python app.py
   ```

5. **Add your Cohere API key to the appropriate config (.env or application.properties)**
   ```bash
   # In .env file
   COHERE_API_KEY=your_cohere_api_key_here
   
   # Or in application.properties
   cohere.api.key=your_cohere_api_key_here
   ```

6. **Launch the React frontend**
   ```bash
   cd frontend
   npm install
   npm start
   ```

7. **Start chatting with Hearth — an AI that listens and cares 💬**