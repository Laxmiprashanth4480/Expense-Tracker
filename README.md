# Pocketly: Expense Tracking System

Pocketly is a powerful and intuitive expense tracker application built using the MERN stack (MongoDB, Express, React, Node.js) and integrated with GenAI. This application helps users track their income, expenses, and financial habits, providing insights and suggestions for better financial management.

## Features

- **Expense Tracking**: Add, edit, and delete income and expense records.
- **Category-based Tracking**: Categorize your expenses for better visualization (e.g., Food, Transportation, Entertainment).
- **AI Integration**: GenAI-powered financial advice and suggestions based on your spending habits to help you save money.
- **Responsive UI**: Clean, modern, and user-friendly interface built with React.
- **Data Persistence**: All user data (expenses, categories, etc.) are stored securely in MongoDB.

## Tech Stack

- **Frontend**: React.js, Redux, Material-UI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **AI Integration**: GenAI for personalized financial insights
- **Charting**: Chart.js for data visualization

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (locally or via a cloud service like MongoDB Atlas)
- npm or yarn

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/snehapadgaonkar/Expense-Tracker.git
   cd Expense-Tracker
   ```
2. Install backend dependencies from the project root (where `server.js` resides):
    ```bash
    npm install
    ```
3. Set up environment variables:
    ```bash
    MONGODB_URI=<your_mongodb_connection_string>
    REACT_APP_GEMINI_API_KEY=<your_genai_api_key>
    REACT_APP_API_BASE=http://localhost:5000/api/v1
    ```
4. Install the frontend dependencies:
    ```bash
    cd client
    npm install
    cd ..
    ```
5. Run the application using:
    ```bash
    npm run dev
    ```
This will launch `server.js` on http://localhost:8080 and the app on http://localhost:3000.

Enjoy managing your finances with Pocketly! 💰📊
