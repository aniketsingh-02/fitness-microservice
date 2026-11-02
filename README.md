🏋️ Fitness Microservice Application



A full-stack AI-powered fitness tracking application built with Spring Boot Microservices and React.
 🏗️ Architecture



Architecture(https://via.placeholder.com/800x400?text=Microservices+Architecture)🚀 Tech Stack



 Backend

Spring Boot- Microservices fram

Spring Cloud Gateway\*\* - API Gateway

Spring Security + Keycloak - OAuth2/PKCE Authentication

Eureka - Service Discovery

Spring Cloud Config- Centralized Configuration

RabbitMQ - Message Queue

MongoDB - Activity & Recommendation storage

PostgreSQL - User data storage

Google Gemini AI - AI-powered fitness recommendations

Docker - Containerization



Frontend

React- UI Framework

Redux- State Management

Material UI - Component Library

Axios - HTTP Client

Vite - Build Tool



 📦 Microservices



| Service | Port | Description |

|---|---|---|

| Config Server | 8888 | Centralized configuration |

| Eureka Server | 8761 | Service discovery |

| API Gateway | 8080 | Single entry point |

| User Service | 8081 | User management (PostgreSQL) |

| Activity Service | 8082 | Activity tracking (MongoDB) |

| AI Service | 8083 | AI recommendations (MongoDB) |

| Frontend | 5173 | React application |



 🔄 Application Flow

User Login (Keycloak OAuth2)

↓

API Gateway (JWT Validation)

↓

Activity Service (Save to MongoDB)

↓

RabbitMQ (Message Queue)

↓

AI Service (Gemini AI Analysis)

↓

Recommendations saved to MongoDB

⚙️ Setup



 Prerequisites

\- Java 21

\- Node.js 18+

\- Docker Desktop

\- MongoDB

\- PostgreSQL



\### Running the Application



1\. Start Docker containers:

```bash

docker start rabbitmq

```



2\. Create config files in `configserver/src/main/resources/config/`:

\- `activity-service.yml`

\- `ai-service.yml` (add your Gemini API key)

\- `user-service.yml`

\- `api-gateway.yml`



3\. Start services in order:
Config Server (8888)

Eureka Server (8761)

User Service (8081)

Activity Service (8082)

AI Service (8083)

API Gateway (8080)

4. Start frontend:

```bash

cd fitness-app-frontend

npm install

npm run dev

```



5\. Open `http://localhost:5173`



\## 🔑 Environment Variables



| Variable | Description |

|---|---|

| GEMINI\_API\_KEY | Google Gemini API key |

| DB\_PASSWORD | PostgreSQL password |



\## 📸 Screenshots



Coming soon...



\## 👨‍💻 Author



\*\*Aniket Singh\*\*

\- GitHub: \[@aniketsingh-02](https://github.com/aniketsingh-02)

