🧠 Hearth – Your AI-Powered Mental Health Chatbot

Overview

Hearth is an AI-driven chatbot designed to support individuals navigating mental health challenges. It engages in empathetic conversations, accurately detects emotional tone, and offers compassionate responses. In critical situations, Hearth can escalate the conversation or guide users to appropriate resources.
This project has been an enriching experience combining AI integration, backend development, and frontend design. Currently leveraging OpenAI’s language model, I plan to incorporate additional AI tools like Hugging Face and Cohere to enhance emotion recognition and crisis detection.


✨ Features

Secure Login: Implemented with Spring Security and JWT to protect user data
Empathetic Chat: AI that listens carefully and responds with kindness
Emotion Recognition: Detects and interprets emotional tones in messages
Crisis Support (Upcoming): Plans to add automatic crisis detection and escalation
Conversation History: Safely stores chats using PostgreSQL
Responsive UI: Smooth, accessible chat interface optimized for all devices
Modular Backend: Clean architecture for easy integration of new AI features


🛠️ Technology Stack

Layer	Technologies
Backend	Java, Spring Boot, Spring Security, JWT
Frontend	React.js, HTML, CSS, JavaScript
Database	PostgreSQL (self-hosted or cloud)
AI APIs	OpenAI (current), Hugging Face & Cohere (planned)
Tools	Postman, IntelliJ IDEA


🧠 How AI Powers Hearth

When users chat with Hearth:
Messages are sent to OpenAI’s API
The AI analyzes emotional tone and mood
Generates thoughtful, empathetic responses focused on mental health support


🔮 Roadmap / What’s Next

Integrate Hugging Face models for advanced emotion recognition
Add Cohere for improved crisis and intent detection
Implement feedback loops to refine conversations over time
Expand multilingual support for broader accessibility
Enhance accessibility features to welcome all users

🧩 Project Structure

hearth-chatbot/
├── backend/        # Spring Boot REST API  
├── frontend/       # React chat interface  
├── db/             # PostgreSQL setup and migrations  
├── docs/           # API documentation and prompt design  
└── README.md       # Project overview and setup instructions 
 

📚 Lessons Learned

Building secure and scalable backend services with Spring Boot
Integrating AI APIs like OpenAI effectively
Designing thoughtful AI prompts for sensitive conversations
Creating responsive and accessible user interfaces with React
Safely storing user data with PostgreSQL
Addressing real-world concerns like ethical AI use and crisis escalation


🚀 Getting Started

Clone the repository
Set up the backend using Spring Boot and connect PostgreSQL
Launch the React frontend
Add your OpenAI API key to .env or application.properties
Start chatting with Hearth and experience compassionate AI support