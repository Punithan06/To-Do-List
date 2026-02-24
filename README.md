# Todo List Application (Django + React)

A modern, responsive Todo List application with a Django backend and a React frontend.

## Prerequisites

- Python 3.x
- Node.js and npm

## Setup Instructions

### Backend (Django)

1. Open a terminal in the project root.
2. Install Python dependencies:
   ```bash
   pip install django djangorestframework django-cors-headers
   ```
3. Run migrations:
   ```bash
   python manage.py makemigrations todo
   python manage.py migrate
   ```
4. Start the Django server:
   ```bash
   python manage.py runserver
   ```
   The backend will be available at `http://localhost:8000`.

### Frontend (React + Vite)

1. Open a new terminal in the `frontend` directory.
2. Install Node dependencies:
   ```bash
   npm install
   ```
3. Start the Vite dev server:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`.

## Features

- **Full CRUD**: Add, list, toggle, and delete tasks.
- **Premium UI**: Modern dark mode design with sleek animations and responsive layout.
- **Real-time API**: Seamless integration between React and Django REST Framework.
- **Clean Architecture**: Organized code structure for both backend and frontend.
