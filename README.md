# TODO LIST (PERN Stack)

A comprehensive todo list application built using the PERN (PostgreSQL, Express.js, React.js, Node.js) stack. This app offers user authentication, allowing users to securely create and manage their tasks. Leveraging React JS for the frontend and Redux Toolkit for state management, the app integrates with a PostgreSQL database using Prisma ORM for efficient data management. With an intuitive interface, users can easily organize and prioritize their tasks to enhance productivity.

## Technologies

>- TypeScript
>- React JS
>- Express JS
>- REdux toolkit
>- PostgreSQL
>- Prisma ORM
>- JSON Web Tokens
>- Vitest


## Getting Started Guide

This guide will help you get started with the **TODO List** application. This application consists of two parts: a frontend built with React JS and a backend built with Express. The frontend and backend are organized into separate folders for easier development and maintenance.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 14.18 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Clone the Repository

```bash
git clone https://github.com/DanielRicra/todo-list-pern.git
cd todo-list-pern
```

## Frontend Setup (Vite)

### Navigate to Frontend Folder

```bash
cd frontend
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

Your Vite frontend development server will start at `http://localhost:5173`. Open this URL in your browser to see the app in action.

## Backend Setup (Express)

### Navigate to Backend Folder

```bash
cd ../backend
```

### Install Dependencies

```bash
npm install
```

### Start Backend Server

```bash
npm run dev
```

Your Express backend development server will start at `http://localhost:3001`. This will serve as the API for your frontend.