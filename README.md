# React Router + Mantine + Vite Base

This repository is a modern front-end codebase using **React** as the core, **React Router v7** for routing, and **Mantine** for components, built with **Vite**.

## ✨ Features

- Modern React architecture with TypeScript
- File-based routing with React Router v7
- Mantine UI components with TailwindCSS support
- API integration with Axios and Tanstack Query
- State management with Jotai
- Built-in authentication flow
- Role-based access control
- Error handling and logging
- Production-ready build configuration

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js**: >= 18.x
- **Yarn**: >= 1.22.x

### Installation

1. Clone the repository:
```bash
git clone https://github.com/brianduc/react-mantine-vanilla-base.git
cd react-mantine-vanilla-base
```

2. Install dependencies:
```bash
yarn install
```

3. Start the development server:
```bash
yarn dev
```

The application will be available at http://localhost:3000

## 🛠️ Technologies Used

- **React** (18+)
- **TypeScript**
- **React Router v7**
- **Mantine UI** (v7+)
- **Vite** (build tool)
- **Tanstack Query** (v5+)
- **Jotai** (state management)
- **Axios** (HTTP client)
- **TailwindCSS** (utility-first CSS)
- **Biome** (formatter and linter)
- **Husky** (git hooks)
- **Commitlint** (commit message validation)

## 📁 Project Structure

```
app/
├── assets/              # Static assets
├── infrastructure/      # Core application infrastructure
│   ├── api/             # API services and hooks
│   ├── common/          # Shared components and utilities
│   ├── core/            # Application constants and config
│   └── utils/           # Helper functions
├── routes/              # File-based routes
public/                  # Public assets
```

## 🌐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_APP_API_URL=         # API base URL
VITE_APP_ENV=development  # Environment (development/production)
VITE_APP_DEBUG=false      # Debug mode
```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.