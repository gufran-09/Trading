# Whirlpool Project Architecture & Workflow

Whirlpool is a real-time, event-driven application that demonstrates a microservices architecture using Java, Kafka, and React. Its primary purpose is to allow users to subscribe to real-time streams of information (Stock prices, Website Up/Down status, and Weather statuses).

## 1. High-Level Architecture
The project is split into a **Frontend (UI)** and an **Event-Driven Backend**. Instead of the frontend directly querying services for data in a traditional REST request/response cycle, the system uses **Apache Kafka** to stream events. Data is pushed to the client via **WebSockets**.

### Core Technologies:
*   **Java 8**: The programming language for all backend microservices.
*   **Apache Kafka & Zookeeper**: The message broker/event bus that handles communication between microservices.
*   **Netty**: High-performance network application framework used by the main Gateway server.
*   **React**: The modern frontend UI.

## 2. Backend Components

The backend consists of Kafka and four separate Java microservices:

1.  **WhirlpoolServer (The Gateway):**
    *   Acts as the central communication hub between the frontend and the Kafka cluster.
    *   It exposes a traditional web server on port `8080` (which serves the old Vanilla JS UI and the login endpoints) and handles **WebSocket** connections for streaming data.
    *   When a user subscribes to data via the UI, this server takes that request and publishes a "command" message to Kafka.
    *   It also listens to the data topics on Kafka and pushes the results back to the browser over the WebSocket.

2.  **StockService:**
    *   Listens to the Kafka topic for stock requests (e.g., `stock-ticker-cmd`).
    *   When it receives a request for a stock (like "GOOG"), it fetches/simulates the stock quote and drops the result into the `stock-ticker` Kafka data topic.

3.  **UpDownService:**
    *   Listens to the Kafka topic for website status requests (e.g., `updown-cmd`).
    *   Pings the requested URLs (like `http://google.com`) and reports the status (Up or Down) back to the `updown` Kafka data topic.

4.  **WeatherService:**
    *   Listens to the Kafka topic for weather updates (e.g., `weather-cmd`).
    *   Looks up the weather for requested ZIP codes or Cities and reports the data back to the `weather` Kafka data topic.

## 3. Frontend Data Flow

1.  **Login & Proxy:** The React Dev Server runs on port `3000`. Requests to `/api` (like `/api/login`) are proxied to the WhirlpoolServer running on port `8080`.
2.  **WebSocket Connection:** Once logged in, the React app establishes a persistent WebSocket connection to the WhirlpoolServer.
3.  **Subscribing to Data:**
    *   The user clicks "Add" on a Stock symbol on the UI.
    *   The Frontend sends a subscribe message to WhirlpoolServer over the WebSocket.
    *   WhirlpoolServer puts a message onto the `stock-ticker-cmd` Kafka topic.
    *   The `StockService` reads from `stock-ticker-cmd`, processes the data, and writes the stock price to the `stock-ticker` topic.
    *   WhirlpoolServer reads the `stock-ticker` topic and pushes the new stock price down the WebSocket to the React Frontend.
    *   The React UI updates the screen instantly.

## 4. Why this Architecture?
*   **Decoupled:** The StockService doesn't know anything about the WeatherService or the React frontend. It only knows about Kafka.
*   **Scalable:** If millions of users request stocks, you can spin up multiple StockServices and Kafka will distribute the load perfectly.
*   **Real-time:** WebSockets allow the server to push new data the millisecond it's available, without the browser having to constantly "ask" if there are updates.
