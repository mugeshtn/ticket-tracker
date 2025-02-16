# ticket-tracker
Ticket tracker is a firebase authenticated platform for managing and tracking customer support tickets efficiently.
=======

## Overview
Ticket tracker is a web-based platform for managing customer support tickets efficiently. It allows users to submit, track, and resolve tickets with role-based access control.

## Features
- User authentication with Firebase (Login, Logout, Role-based access)
- Create, update, and delete support tickets
- Real-time Firestore database integration
- Responsive UI using React and HeroUI
- Loading animations for better user experience
- Role-based access for customers and support agents

## Tech Stack
- **Frontend**: React (Vite), TypeScript, Tailwind CSS, HeroUI
- **Backend**: Firebase Authentication & Firestore
- **Hosting**: Firebase Hosting (or other platforms)

## Installation & Setup

### Prerequisites
- Node.js & npm installed
- Firebase project set up

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/ticket-tracker.git
   cd ticket-tracker
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure Firebase:
   - Create a `.env` file in the root directory and add:
     ```env
     VITE_FIREBASE_API_KEY=your_api_key
     VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
     VITE_FIREBASE_PROJECT_ID=your_project_id
     VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
     VITE_FIREBASE_APP_ID=your_app_id
     ```
4. Start the development server:
   ```sh
   npm run dev
   ```

## Future Improvements
- Implement ticket assignment system
- Improve and implement support system UI/UX
- Add email notifications for ticket updates
- Improve UI/UX with better animations and accessibility
- Integrate chatbot support for automated responses

## Usage
- Users can log in and view their tickets.
- Support agents can manage and resolve tickets.
- Admins can monitor overall ticket activity.

---
Developed by Mugesh TN

>>>>>>> b4e267c (initial commit)
