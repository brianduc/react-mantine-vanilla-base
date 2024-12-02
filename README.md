# React Router + Mantine
This repository is a front-end codebase using **React** as the core, **React Router v7** for routing, and **Mantine** for components.




## 📖 Table of Contents



- [Features](#-features)

- [Getting Started](#-getting-started)

- [Technologies Used](#-technologies-used)

- [Project Structure](#-project-structure)

- [Environment Variables](#-environment-variables)





## ✨ Features

•  The core features included in this base are: User authentication, API hooks, admin layout, and role-based access control.

•  Key technologies used in the codebase: React Router v7, Mantine, Tanstack Query, and Jotai.

•  Thanks to the use of **React Router v7**, this codebase can support both **SPA (Single Page Application)** or **SSR (Server Side Rendering)** depending on project requirements and goals.

•  **Mantine** provides a comprehensive set of components and hooks without needing additional dependencies such as react-hook-form or rechart.

•  **Tanstack Query** enhances performance when fetching data from APIs and managing states related to API requests.

•  **NOTE**: Make sure to thoroughly read the documentation of the main technologies listed above before using this codebase in a project.

## 🚀 Getting Started

### Prerequisites




Ensure you have the following installed:

•  **Node.js**: >= 16.x

•  **npm** or **yarn** (yarn is recommended; check the latest configuration [here](https://yarnpkg.com/getting-started/install))



### Installation



1. Clone the repository:



```bash
git clone https://github.com/brianduc/react-mantine-vanilla-base.git

cd react-mantine-vanilla-base
```

2.  Install dependencies:

```
yarn
```
or
```
npm i
```
3.  Start the development server:
```
yarn dev
```
or

```
npm run dev
```

This starts the app at http://localhost:3000 by default, you can change the port based on your choice.

---

**🛠️ Technologies Used**



•  **React** (18+, will update to 19 when stable)

•  **TypeScript**

•  **React Router v7** for navigation and routing

•  **Axios** for API calls

•  **Tanstack Query** (React Query) for state and caching

•  **Mantine** (UI library)

•  **Vite** (build tool)

•  **Jotai** (Atom-based state management)

•  **Biome** - formatter, code analysis and linting

•  **TailwindCSS** for styling

•  **Husky** for git hooks
  
---

**📁 Project Structure**



This is a brief description of project directory structure:




app/
├── assets/              # Static assets such as images, icons, etc.
├── components/          # Reusable UI components
├── hooks/               # Custom React hooks
├── infrastructure/      # API services, constants, configurations
├── routes/              # File-based routes, required by React Router v7
├── styles/              # Global and component-specific styles
├── utils/               # Helper functions and utilities
├── App.tsx              # Main React component
├── main.tsx             # React DOM render entry point
├── root.tsx             # Root component for application layout
├── index.css            # Global styles

---

**🌐 Environment Variables**



Define all environment variables used in the project. Place these in a .env file at the root of your project.

```
VITE_APP_API_URL=""        # Your API base URL
VITE_APP_SOCKET_URL=""     # Your WebSocket URL
REACT_APP_ENABLE_LOGGER="false"
```

**Note**: Never commit your .env file or secrets to version control.
  