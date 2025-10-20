# 🎨 Kaiburr Task Manager - Frontend

> A modern, responsive React dashboard for managing and executing Kubernetes-based shell tasks

[![React](https://img.shields.io/badge/React-18+-61DAFB.svg?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0+-646CFF.svg?logo=vite)](https://vitejs.dev/)
[![Ant Design](https://img.shields.io/badge/Ant%20Design-5.0+-0170FE.svg?logo=ant-design)](https://ant.design/)

---

## 📋 Overview

The **Task Manager Frontend** is a sleek, intuitive web interface that connects to the Task Manager API (Kubernetes Edition). Built with modern web technologies, it provides a seamless experience for creating, managing, and monitoring shell task executions in your Kubernetes cluster.

### Why This Frontend?

- **🎯 User-Friendly**: No command-line knowledge required to manage tasks
- **📊 Real-Time Monitoring**: Track task execution status and view detailed logs
- **🔍 Smart Search**: Quickly find tasks with intelligent filtering
- **📱 Responsive Design**: Works beautifully on desktop, tablet, and mobile
- **⚡ Lightning Fast**: Built with Vite for instant hot module replacement
- **🛡️ Client-Side Validation**: Prevents dangerous commands before they reach the server

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| **📝 Task Management** | Create, update, and delete tasks with a clean interface |
| **▶️ One-Click Execution** | Execute tasks instantly and watch them run in real-time |
| **📜 Execution History** | Complete audit trail with timestamps and full pod logs |
| **🔍 Advanced Search** | Filter tasks by name and status (Idle/Running/Success/Failed) |
| **📊 Dashboard Stats** | Visual cards showing total tasks, executions, and success rates |
| **📄 Paginated Tables** | Handle hundreds of tasks with smooth pagination |
| **🎨 Modern UI/UX** | Beautiful Ant Design components with custom styling |
| **🔒 Safety Checks** | Client-side validation blocks dangerous commands |



## 🖼️ Screenshots
<img width="1920" height="1080" alt="Screenshot (208)" src="https://github.com/user-attachments/assets/0e9d189d-7ba4-45f1-9293-4862557a15d8" />
<img width="1920" height="1080" alt="Screenshot (209)" src="https://github.com/user-attachments/assets/d211dda5-ff04-4fc1-b394-245927bd8be7" />
<img width="1920" height="1080" alt="Screenshot (205)" src="https://github.com/user-attachments/assets/a00b9f07-9b3f-4def-9a0f-b640e2b6278f" />
<img width="1920" height="1080" alt="Screenshot (206)" src="https://github.com/user-attachments/assets/2adf08b0-5f82-48cd-8697-9f555f07261d" />
<img width="1920" height="1080" alt="Screenshot (207)" src="https://github.com/user-attachments/assets/a1a18fba-a99f-4f0c-8cdb-4dc0d82c7d21" />



## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  React Application                       │
│                  (Vite + TypeScript)                     │
│                                                           │
│  ┌──────────────┐        ┌──────────────────────┐       │
│  │   TaskList   │───────▶│  CreateTaskForm      │       │
│  │  Component   │        │   Component          │       │
│  └──────────────┘        └──────────────────────┘       │
│         │                          │                     │
│         └──────────┬───────────────┘                     │
│                    ▼                                     │
│         ┌────────────────────┐                           │
│         │   API Service      │                           │
│         │   (Axios Client)   │                           │
│         └────────────────────┘                           │
│                    │                                     │
└────────────────────┼─────────────────────────────────────┘
                     │
                     ▼
          ┌──────────────────────┐
          │  Task Manager API    │
          │  (Spring Boot)       │
          │  http://localhost:30001  │
          └──────────────────────┘
```

---

## 🛠️ Technology Stack

### Core
- **React 18+**: Modern UI library with hooks and concurrent features
- **TypeScript 5.0+**: Type-safe development experience
- **Vite 5.0+**: Next-generation frontend tooling

### UI Framework
- **Ant Design 5.0+**: Enterprise-class UI component library
- **Ant Design Icons**: Comprehensive icon set

### HTTP Client
- **Axios**: Promise-based HTTP client with interceptors

### Development Tools
- **ESLint**: Code quality and consistency
- **TypeScript ESLint**: TypeScript-specific linting rules
- **Vite Plugin React**: Fast refresh and JSX transformation

---

## 📁 Project Structure

```
task-manager-frontend/
│
├── public/                                 # Static assets
│   ├── screenshots/                        # App screenshots
│   └── vite.svg                            # App icon
│
├── src/
│   ├── components/
│   │   ├── TaskList.tsx                    # 🌟 Main task table & actions
│   │   └── CreateTaskForm.tsx              # 🌟 Task creation/edit form
│   │
│   ├── services/
│   │   └── api.ts                          # 🌟 API client & types
│   │
│   ├── App.tsx                             # Main app component
│   ├── main.tsx                            # App entry point
│   ├── App.css                             # Global styles
│   └── vite-env.d.ts                       # Vite types
│
├── .vscode/
│   └── launch.json                         # Debug configuration
│
├── index.html                              # HTML template
├── package.json                            # Dependencies
├── tsconfig.json                           # TypeScript config
├── vite.config.ts                          # Vite config
└── README.md                               # This file
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- ✅ **Node.js 18+** (LTS recommended)
- ✅ **npm** or **yarn** package manager
- ✅ **Backend API** running at `http://localhost:30001`
  - See the [Task Manager API documentation](../backend/README.md) for setup

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd task-manager-frontend

# Install dependencies
npm install
# or with yarn
yarn install
```

### Development Server

```bash
# Start Vite dev server with hot reload
npm run dev
# or
yarn dev

# The app will be available at:
# ➜  Local:   http://localhost:5173/
# ➜  Network: use --host to expose
```

### Production Build

```bash
# Build optimized production bundle
npm run build
# or
yarn build

# Output will be in the dist/ folder
```

### Preview Production Build

```bash
# Preview the production build locally
npm run preview
# or
yarn preview

# Accessible at http://localhost:4173/
```

---

## 🔧 Configuration

### Backend API Endpoint

Update the backend URL in `src/services/api.ts`:

```typescript
const apiClient = axios.create({
  baseURL: 'http://localhost:30001', // Change this to your backend URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### Common Configurations

| Environment | Backend URL | Notes |
|------------|-------------|-------|
| **Local Development** | `http://localhost:30001` | Default for Minikube/Docker Desktop |
| **Production** | `https://api.yourdomain.com` | Use your deployed API endpoint |
| **Staging** | `https://staging-api.yourdomain.com` | Staging environment |

---

## 🎯 Core Components

### 1. TaskList Component (`src/components/TaskList.tsx`)

The heart of the application, responsible for:

- **Display**: Renders tasks in a paginated, sortable table
- **Actions**: Execute, edit, and delete tasks
- **Search**: Real-time filtering by task name
- **Status Filters**: Filter by Idle, Running, Success, Failed
- **History Modal**: View complete execution history per task
- **Stats Cards**: Summary statistics (total tasks, executions, success rate)

**Key Features**:
```typescript
- Automatic refresh after actions
- Confirmation dialogs for destructive actions
- Loading states and error handling
- Responsive table with mobile optimization
```

### 2. CreateTaskForm Component (`src/components/CreateTaskForm.tsx`)

Handles task creation and editing:

- **Form Validation**: Required fields and format validation
- **Safety Checks**: Blocks dangerous commands (rm, sudo, shutdown)
- **Owner Field**: Assigns task ownership
- **Command Input**: Multi-line text area for complex commands
- **User Feedback**: Success/error notifications

**Safety Validation Example**:
```typescript
const dangerousPatterns = ['rm ', 'sudo ', 'shutdown'];
// Prevents submission if dangerous commands detected
```

### 3. API Service (`src/services/api.ts`)

Centralized API communication layer:

#### Type Definitions
```typescript
interface Task {
  id: string;
  name: string;
  owner: string;
  command: string;
  status?: 'idle' | 'running' | 'success' | 'failed';
}

interface TaskExecution {
  executionId: string;
  timestamp: string;
  podName: string;
  logs: string;
  status: string;
}

interface TaskInput {
  name: string;
  owner: string;
  command: string;
}
```

#### API Functions
```typescript
getAllTasks()              // GET /tasks
getTaskById(id)            // GET /tasks/{id}
searchTasksByName(name)    // GET /tasks/search?name={name}
createOrUpdateTask(task)   // PUT /tasks or PUT /tasks/{id}
deleteTask(id)             // DELETE /tasks/{id}
executeTask(id)            // POST /tasks/{id}/execute
```

---

## 🐛 Debugging

### Visual Studio Code Setup

1. **Install Recommended Extensions**:
   - ESLint
   - TypeScript and JavaScript Language Features
   - Vite (optional)

2. **Debug Configuration** (`.vscode/launch.json`):

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome (Vite)",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src",
      "sourceMaps": true
    },
    {
      "type": "firefox",
      "request": "launch",
      "name": "Launch Firefox (Vite)",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src"
    }
  ]
}
```

3. **Set Breakpoints**:
   - Open any `.tsx` file (e.g., `TaskList.tsx`)
   - Click in the gutter to set breakpoints
   - Press `F5` to start debugging

### Browser DevTools

- **Network Tab**: Monitor API requests and responses
- **Console**: View error messages and logs
- **React DevTools**: Inspect component state and props
- **Redux DevTools**: (if added later) Track state changes

---

## 🔒 Security Features

### Client-Side Validation

The frontend implements several safety measures:

1. **Dangerous Command Detection**:
   ```typescript
   // Blocks these patterns in CreateTaskForm
   const blockedCommands = ['rm ', 'sudo ', 'shutdown'];
   ```

2. **Input Sanitization**:
   - Trims whitespace from inputs
   - Validates required fields
   - Enforces reasonable length limits

3. **Confirmation Dialogs**:
   - Delete operations require confirmation
   - Clear warning messages for destructive actions

### Important Security Notes

⚠️ **Client-side validation is not sufficient for security!**

- Always implement server-side validation
- Use proper authentication and authorization
- Never trust client-side data
- The backend should enforce all security policies

---

## 📊 Usage Examples

### Creating a New Task

1. Click the **"Create Task"** button
2. Fill in the form:
   - **Name**: `disk-check`
   - **Owner**: `admin`
   - **Command**: `df -h`
3. Click **Submit**
4. Task appears in the table immediately

### Executing a Task

1. Find your task in the table
2. Click the **"Execute"** button (▶️ icon)
3. Watch the status change to "Running"
4. View execution results in the **"History"** modal

### Viewing Execution History

1. Click the **"History"** button (📜 icon) for any task
2. Modal displays all executions with:
   - Timestamp
   - Pod name
   - Complete logs
   - Exit status
3. Scroll through multiple executions

### Searching and Filtering

1. Use the **search box** to filter by name
2. Click status **tags** to filter by execution state:
   - 🔵 Idle (never executed)
   - 🟡 Running (currently executing)
   - 🟢 Success (completed successfully)
   - 🔴 Failed (execution error)

---

## 🎨 Customization

### Styling

Modify `src/App.css` for global styles:

```css
/* Example: Change primary color */
:root {
  --primary-color: #1890ff;
  --success-color: #52c41a;
  --error-color: #f5222d;
}
```

### Ant Design Theme

Customize in `vite.config.ts`:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          '@primary-color': '#1DA57A', // Custom primary color
        },
        javascriptEnabled: true,
      },
    },
  },
});
```

---

## 🚨 Common Issues & Solutions

### Issue: CORS Errors

**Symptom**: API requests fail with CORS policy error

**Solution**:
1. Ensure backend allows requests from `http://localhost:5173`
2. Add CORS configuration to Spring Boot:
   ```java
   @CrossOrigin(origins = "http://localhost:5173")
   ```

### Issue: API Connection Refused

**Symptom**: Network errors or "Connection refused"

**Solution**:
1. Verify backend is running: `curl http://localhost:30001/tasks`
2. Check `baseURL` in `src/services/api.ts`
3. Ensure correct NodePort in Kubernetes

### Issue: TypeScript Errors

**Symptom**: Type errors in console or build failures

**Solution**:
```bash
# Check types without building
npx tsc --noEmit

# Fix common issues
npm install --save-dev @types/react @types/node
```

### Issue: Build Fails

**Symptom**: `npm run build` errors

**Solution**:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check Node version
node --version  # Should be 18+
```

---

## 🧪 Testing (Future Enhancement)

### Planned Testing Strategy

- **Unit Tests**: Jest + React Testing Library
- **Component Tests**: Test individual components in isolation
- **Integration Tests**: Test API interactions with mock server
- **E2E Tests**: Playwright or Cypress for full user flows

### Example Test Setup

```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest
```

---

## 📦 Deployment

### Static Hosting (Recommended)

1. **Build the app**:
   ```bash
   npm run build
   ```

2. **Deploy `dist/` folder** to:
   - **Netlify**: Drag & drop or Git integration
   - **Vercel**: Zero-config deployment
   - **GitHub Pages**: Use `gh-pages` package
   - **AWS S3**: Host as static website
   - **Nginx**: Serve the `dist` folder

### Docker Deployment

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Build and run:
```bash
docker build -t task-manager-frontend .
docker run -p 8080:80 task-manager-frontend
```

### Environment Variables

For different environments, use `.env` files:

```bash
# .env.development
VITE_API_URL=http://localhost:30001

# .env.production
VITE_API_URL=https://api.production.com
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

---


---


