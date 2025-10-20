# Kaiburr Task Manager (Frontend)

A lightweight React + Vite UI for managing and executing scheduled shell tasks. Built with TypeScript and Ant Design.

## Features

- List, create, execute, and delete tasks.
- View execution history per task with output and timestamps.
- Search and filter tasks by status (Idle / Running / Success / Failed).
- Responsive UI with paginated table and stats cards.
- Safe client-side validation preventing obvious dangerous commands.

Key UI files:

- Component: [`TaskList`](src/components/TaskList.tsx) — [src/components/TaskList.tsx](src/components/TaskList.tsx)
- Component: [`CreateTaskForm`](src/components/CreateTaskForm.tsx) — [src/components/CreateTaskForm.tsx](src/components/CreateTaskForm.tsx)
- App entry: [`App`](src/App.tsx) — [src/App.tsx](src/App.tsx)
- App mount: [`main.tsx`](src/main.tsx) — [src/main.tsx](src/main.tsx)

Key API surface (frontend service):

- Types: [`Task`](src/services/api.ts), [`TaskExecution`](src/services/api.ts), [`TaskInput`](src/services/api.ts) — [src/services/api.ts](src/services/api.ts)
- Functions: [`getAllTasks`](src/services/api.ts), [`getTaskById`](src/services/api.ts), [`searchTasksByName`](src/services/api.ts), [`createOrUpdateTask`](src/services/api.ts), [`deleteTask`](src/services/api.ts), [`executeTask`](src/services/api.ts) — [src/services/api.ts](src/services/api.ts)

## Prerequisites

- Node.js 18+ (recommended)
- npm or yarn
- Backend service running (default expected at http://localhost:30001). See [src/services/api.ts](src/services/api.ts) to change baseURL.

## Installation

```bash
# Install dependencies
npm install
# or
yarn

Run (Development)
# Start dev server (Vite)
npm run dev
# or
yarn dev
# Build production assets
npm run build
# Preview the production build locally
npm run preview

Debugging in VS Code
Open the project in Visual Studio Code.
Install recommended extensions: ESLint, TypeScript, React, Vite tooling.
Use the built-in terminal to run npm run dev.
Configure a debug configuration in .vscode/launch.json (example below) to attach to the browser or Node process if needed.
Example minimal launch config for Chrome (add to .vscode/launch.json):

{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "pwa-chrome",
      "request": "launch",
      "name": "Launch Chrome (Vite)",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src"
    }
  ]
}

Tips:

Set breakpoints in files such as TaskList.tsx and CreateTaskForm.tsx.
Use the browser devtools to debug network calls; API requests are sent to the endpoint configured in api.ts.
Backend API integration
The frontend talks to a REST backend. Update backend URL in api.ts:

Change baseURL in the axios client if your backend runs on a different port.
Important functions:

getAllTasks — fetches tasks list.
createOrUpdateTask — PUT to create/update tasks.
executeTask — triggers task execution.
deleteTask — deletes a task.
Security notes
The frontend has a client-side check that blocks commands containing rm , sudo , or shutdown in CreateTaskForm. Backend should enforce stronger validation and authorization.
Adding Images to the README or App
Place images into the public folder (e.g., public/screenshots/overview.png) and reference them as /screenshots/overview.png in markdown or JSX.
Example markdown image insertion:


Project Structure
TaskList.tsx — main task UI and table
CreateTaskForm.tsx — form for creating tasks
api.ts — axios client, types, and API functions
App.tsx, main.tsx — app shell and mount point
public/ — static assets (images, icons)
Common Issues
CORS errors: ensure backend allows requests from the dev server origin.
Wrong API endpoint: confirm baseURL in api.ts.
Typescript errors: run npm run build or tsc --noEmit to see full type errors.
Contributing
Fork, create a feature branch, run tests (if added), and open a PR.
Keep UI changes confined to src/components/*.
```
