📋 React Native To-Do App

A simple and modern To-Do List App built with React Native and Expo.
It includes user authentication (Register/Login), secure token storage with AsyncStorage, and a video background for a cool UI.

-- Features

1 User Authentication

* Register new users

* Login existing users

* JWT token stored securely using AsyncStorage

2 Task Management

* Add, view, and manage your tasks

* Tasks are stored per user

3 Video Background

* Custom video background on Login & Register screens using expo-av

4 Smooth UI

* Styled components with React Native StyleSheet

* Buttons and inputs with clean design

5 Tech Stack

* React Native (Expo)

* AsyncStorage → Store user tokens locally

* Expo AV → Play background videos

* Node.js + Express (Backend) → Handles user authentication and tasks (if using API)

* JWT → Authentication

⚡ Installation & Setup

Clone the repo:

git clone https://github.com/yourusername/todo-app.git
cd todo-app


Install dependencies:

* npm install

* Start the Expo development server:

* npx expo start


Run on Android/iOS simulator or Expo Go App.

🔑 Environment Setup

Make sure to update your backend API URL in utils/api.js:

const API_URL = "http://your-backend-url/api";
